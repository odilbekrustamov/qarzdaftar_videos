import wave
import struct
import math
import os
import subprocess

def load_wav(filepath):
    with wave.open(filepath, 'rb') as f:
        rate = f.getframerate()
        nframes = f.getnframes()
        raw = f.readframes(nframes)
    samples = list(struct.unpack(f'<{nframes}h', raw))
    return samples, rate

def save_wav(filepath, samples, rate):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    clipped = [max(-32767, min(32767, int(s))) for s in samples]
    raw = struct.pack(f'<{len(clipped)}h', *clipped)
    with wave.open(filepath, 'wb') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(rate)
        f.writeframes(raw)

def humanize_silences(samples, rate, max_silence_ms=220, threshold=450):
    """
    Remove rigid robotic pauses between words while keeping natural breathing.
    """
    win_size = int(rate * 0.015)
    max_silence_samples = int(rate * (max_silence_ms / 1000.0))

    energies = []
    for i in range(0, len(samples), win_size):
        chunk = samples[i:i+win_size]
        if not chunk:
            break
        rms = math.sqrt(sum(s*s for s in chunk) / len(chunk))
        energies.append(rms)

    is_silent = [rms < threshold for rms in energies]

    output = []
    i = 0
    while i < len(samples):
        win_idx = i // win_size
        if win_idx < len(is_silent) and is_silent[win_idx]:
            silence_start = i
            while i < len(samples) and (i // win_size) < len(is_silent) and is_silent[i // win_size]:
                i += win_size
            silence_end = min(i, len(samples))
            silence_len = silence_end - silence_start

            if silence_start == 0:
                keep = int(rate * 0.05)
                output.extend(samples[silence_end - keep:silence_end] if silence_len > keep else samples[0:silence_len])
            elif silence_end >= len(samples) - win_size:
                keep = int(rate * 0.10)
                output.extend(samples[silence_start:silence_start + keep] if silence_len > keep else samples[silence_start:])
            elif silence_len > max_silence_samples:
                keep_half = max_silence_samples // 2
                output.extend(samples[silence_start:silence_start + keep_half])
                output.extend(samples[silence_end - keep_half:silence_end])
            else:
                output.extend(samples[silence_start:silence_end])
        else:
            output.append(samples[i])
            i += 1

    return output

def humanize_voice_master(samples, rate):
    """
    Remove robotic digital boxiness:
    - High-frequency presence excitation (adds natural air to 22kHz speech)
    - Low-mid warmth (adds chest resonance)
    - Dynamic compression (smooths robotic volume jumps)
    """
    # 1. High-frequency breath/air enhancement
    air_samples = []
    prev = 0.0
    for s in samples:
        # High shelf boost
        diff = s - prev
        enhanced = s + 0.35 * diff
        air_samples.append(enhanced)
        prev = s

    # 2. Chest resonance boost
    warm_samples = []
    y_prev = 0.0
    for s in air_samples:
        y = s + 0.25 * y_prev
        warm_samples.append(y)
        y_prev = y * 0.65

    # 3. Soft-knee vocal compressor
    thresh = 13000.0
    ratio = 2.4
    compressed = []
    for s in warm_samples:
        sign = 1 if s >= 0 else -1
        abs_s = abs(s)
        if abs_s > thresh:
            c = thresh + (abs_s - thresh) / ratio
        else:
            c = abs_s
        compressed.append(sign * c)

    # 4. Normalize to -0.8 dBFS
    peak = max(abs(s) for s in compressed) or 1.0
    gain = 30500.0 / peak
    return [s * gain for s in compressed]

in_file = 'qarzdaftar_videos/myvoice/591ce9ae-9499-43ad-9fec-3bfcf8100065.wav'
out_wav = 'qarzdaftar_videos/public/lessons/lesson-01-intro/audio/uz/samples/sample_new_humanized_1.wav'
out_m4a = 'qarzdaftar_videos/public/lessons/lesson-01-intro/audio/uz/samples/sample_new_humanized_1.m4a'

samples, rate = load_wav(in_file)
print(f"Original: {len(samples)/rate:.2f}s")

# Step 1: Humanize silences
smooth = humanize_silences(samples, rate, max_silence_ms=230)
print(f"Smoothed silences: {len(smooth)/rate:.2f}s")

# Step 2: Master for human warmth & air
mastered = humanize_voice_master(smooth, rate)

save_wav(out_wav, mastered, rate)

# Convert to m4a
subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', out_wav, out_m4a], check=True)
print("Saved humanized sample 1!")
