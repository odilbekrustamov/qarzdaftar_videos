import wave
import struct
import math
import subprocess
import os

def load_wav(filepath):
    with wave.open(filepath, 'rb') as f:
        channels = f.getnchannels()
        sampwidth = f.getsampwidth()
        rate = f.getframerate()
        nframes = f.getnframes()
        raw = f.readframes(nframes)
    samples = list(struct.unpack(f'<{nframes}h', raw))
    return samples, rate

def save_wav(filepath, samples, rate):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    # Clip to int16
    clipped = [max(-32767, min(32767, int(s))) for s in samples]
    raw = struct.pack(f'<{len(clipped)}h', *clipped)
    with wave.open(filepath, 'wb') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(rate)
        f.writeframes(raw)

def compress_silences(samples, rate, max_silence_ms=180, threshold=500):
    win_size = int(rate * 0.015) # 15ms window
    max_silence_samples = int(rate * (max_silence_ms / 1000.0))
    crossfade_len = int(rate * 0.01) # 10ms crossfade

    # Calculate RMS for each window
    energies = []
    for i in range(0, len(samples), win_size):
        chunk = samples[i:i+win_size]
        if not chunk:
            break
        rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
        energies.append(rms)

    # Classify windows
    is_silent = [rms < threshold for rms in energies]

    # Find silence runs
    output = []
    i = 0
    while i < len(samples):
        win_idx = i // win_size
        if win_idx < len(is_silent) and is_silent[win_idx]:
            # Beginning of silence
            silence_start = i
            while i < len(samples) and (i // win_size) < len(is_silent) and is_silent[i // win_size]:
                i += win_size
            silence_end = min(i, len(samples))
            silence_len = silence_end - silence_start

            # If it's leading silence (at the very beginning)
            if silence_start == 0:
                keep = int(rate * 0.05) # 50ms lead
                output.extend(samples[silence_end - keep:silence_end] if silence_len > keep else samples[0:silence_len])
            elif silence_end >= len(samples) - win_size:
                # Trailing silence
                keep = int(rate * 0.1) # 100ms trail
                output.extend(samples[silence_start:silence_start + keep] if silence_len > keep else samples[silence_start:])
            elif silence_len > max_silence_samples:
                # Truncate internal silence smoothly
                keep_half = max_silence_samples // 2
                output.extend(samples[silence_start:silence_start + keep_half])
                # Small crossfade
                output.extend(samples[silence_end - keep_half:silence_end])
            else:
                output.extend(samples[silence_start:silence_end])
        else:
            output.append(samples[i])
            i += 1

    return output

def wsola_timestretch(samples, rate, speed=1.07):
    """
    High-quality WSOLA (Waveform Similarity Overlap-Add) time-stretching.
    Speed > 1.0 speeds up audio without changing pitch.
    """
    if abs(speed - 1.0) < 0.005:
        return samples

    win_len = int(rate * 0.030) # 30ms window (720 samples at 24k)
    hop_out = win_len // 2       # Synthesis hop (15ms)
    hop_in = int(hop_out * speed)# Analysis hop
    search_range = int(rate * 0.010) # 10ms search range

    # Hanning window
    window = [0.5 * (1 - math.cos(2 * math.pi * n / (win_len - 1))) for n in range(win_len)]

    out_len = int(len(samples) / speed) + win_len
    output = [0.0] * out_len
    norm = [0.0] * out_len

    in_pos = 0
    out_pos = 0

    while in_pos + win_len < len(samples) and out_pos + win_len < out_len:
        # Search for best match near in_pos
        best_offset = 0
        best_corr = -1e12

        # In first step or if out of bounds, no search
        if out_pos > 0:
            ref_idx = in_pos
            for delta in range(-search_range, search_range, 2):
                cand_idx = in_pos + delta
                if cand_idx < 0 or cand_idx + win_len >= len(samples):
                    continue
                # Cross-correlation with previous overlap region
                overlap_start = out_pos
                overlap_len = win_len // 2
                corr = 0.0
                for k in range(0, overlap_len, 4): # subsample for speed
                    target_val = output[overlap_start + k]
                    cand_val = samples[cand_idx + k]
                    corr += target_val * cand_val
                if corr > best_corr:
                    best_corr = corr
                    best_offset = delta

        actual_in = in_pos + best_offset
        if actual_in < 0 or actual_in + win_len >= len(samples):
            actual_in = in_pos

        # Overlap-add
        for n in range(win_len):
            output[out_pos + n] += samples[actual_in + n] * window[n]
            norm[out_pos + n] += window[n]

        in_pos += hop_in
        out_pos += hop_out

    # Normalize overlapping regions
    final_samples = []
    for s, n in zip(output[:out_pos], norm[:out_pos]):
        if n > 1e-4:
            final_samples.append(s / n)
        else:
            final_samples.append(s)

    return final_samples

def vocal_master(samples, rate):
    """
    Apply broadcast vocal mastering:
    - Soft vocal compression
    - Presence EQ boost (high shelf)
    - Peak normalize to -1.0 dBFS
    """
    # 1. High-frequency presence boost (simple high-shelf / pre-emphasis)
    # y[n] = x[n] + 0.25 * (x[n] - x[n-1]) gives +2.5dB air and presence
    eq_samples = []
    prev = 0.0
    for s in samples:
        enhanced = s + 0.28 * (s - prev)
        eq_samples.append(enhanced)
        prev = s

    # 2. Dynamic range compression (soft-knee compressor)
    # Threshold = 14000, ratio = 2.5:1
    thresh = 13000.0
    ratio = 2.5
    compressed = []
    for s in eq_samples:
        sign = 1 if s >= 0 else -1
        abs_s = abs(s)
        if abs_s > thresh:
            c = thresh + (abs_s - thresh) / ratio
        else:
            c = abs_s
        compressed.append(sign * c)

    # 3. Peak normalize to ~92% full scale (-0.8 dBFS)
    peak = max(abs(s) for s in compressed) or 1.0
    target_peak = 30000.0
    gain = target_peak / peak

    normalized = [s * gain for s in compressed]
    return normalized

def process_file(in_wav, out_wav, out_mp3, speed=1.08, max_silence_ms=180):
    samples, rate = load_wav(in_wav)
    print(f'Input: {len(samples)/rate:.2f}s ({len(samples)} samples @ {rate}Hz)')

    # Step 1: Compress awkward silences
    trimmed = compress_silences(samples, rate, max_silence_ms=max_silence_ms, threshold=550)
    print(f'After silence compression: {len(trimmed)/rate:.2f}s')

    # Step 2: Time-stretch for natural lively pace
    stretched = wsola_timestretch(trimmed, rate, speed=speed)
    print(f'After time-stretch ({speed}x): {len(stretched)/rate:.2f}s')

    # Step 3: Vocal mastering (EQ + compression + normalization)
    mastered = vocal_master(stretched, rate)

    # Save WAV
    save_wav(out_wav, mastered, rate)

    # Convert to high-quality MP3 via macOS afconvert
    cmd = ['afconvert', '-f', 'MPG3', '-d', 'mp3', '-b', '192000', out_wav, out_mp3]
    subprocess.run(cmd, check=True)
    print(f'Saved: {out_mp3}')

if __name__ == '__main__':
    import sys
    in_file = sys.argv[1] if len(sys.argv) > 1 else 'qarzdaftar_videos/myvoice/voicelab-speech.wav'
    out_wav = 'qarzdaftar_videos/public/lessons/lesson-01-intro/audio/uz/samples/sample_enhanced_1.wav'
    out_mp3 = 'qarzdaftar_videos/public/lessons/lesson-01-intro/audio/uz/samples/sample_enhanced_1.mp3'
    process_file(in_file, out_wav, out_mp3, speed=1.08, max_silence_ms=170)
