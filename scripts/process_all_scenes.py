import wave
import struct
import math
import subprocess
import os
import json
import re

ROOT = '/Users/softonic/QarzDaftar/qarzdaftar_videos'
MYVOICE_DIR = os.path.join(ROOT, 'myvoice')
OUT_AUDIO_DIR = os.path.join(ROOT, 'public/lessons/lesson-01-intro/audio/uz')
MANIFEST_PATH = os.path.join(ROOT, 'src/lessons/lesson-01-intro/audio-manifest.json')
SCRIPT_PATH = os.path.join(ROOT, 'src/lessons/lesson-01-intro/script.json')

SCENE_MAPPING = [
    {
        "id": "intro",
        "file": "voicelab-speech.wav",
        "speed": 1.0,
        "max_silence_ms": 280
    },
    {
        "id": "quick-debt",
        "file": "voicelab-speech (1).wav",
        "speed": 1.0,
        "max_silence_ms": 280
    },
    {
        "id": "installment",
        "file": "voicelab-speech (2).wav",
        "speed": 1.0,
        "max_silence_ms": 280
    },
    {
        "id": "suppliers",
        "file": "voicelab-speech (3).wav",
        "speed": 1.0,
        "max_silence_ms": 280
    },
    {
        "id": "analytics",
        "file": "voicelab-speech (5).wav",
        "speed": 1.0,
        "max_silence_ms": 280
    },
    {
        "id": "outro",
        "file": "voicelab-speech (4).wav",
        "speed": 1.0,
        "max_silence_ms": 280
    }
]

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
    clipped = [max(-32767, min(32767, int(s))) for s in samples]
    raw = struct.pack(f'<{len(clipped)}h', *clipped)
    with wave.open(filepath, 'wb') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(rate)
        f.writeframes(raw)

def compress_silences(samples, rate, max_silence_ms=170, threshold=550):
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
                keep = int(rate * 0.1)
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

def wsola_timestretch(samples, rate, speed=1.08):
    if abs(speed - 1.0) < 0.005:
        return samples

    win_len = int(rate * 0.030)
    hop_out = win_len // 2
    hop_in = int(hop_out * speed)
    search_range = int(rate * 0.010)

    window = [0.5 * (1 - math.cos(2 * math.pi * n / (win_len - 1))) for n in range(win_len)]

    out_len = int(len(samples) / speed) + win_len
    output = [0.0] * out_len
    norm = [0.0] * out_len

    in_pos = 0
    out_pos = 0

    while in_pos + win_len < len(samples) and out_pos + win_len < out_len:
        best_offset = 0
        best_corr = -1e12

        if out_pos > 0:
            overlap_start = out_pos
            overlap_len = win_len // 2
            for delta in range(-search_range, search_range, 2):
                cand_idx = in_pos + delta
                if cand_idx < 0 or cand_idx + win_len >= len(samples):
                    continue
                corr = 0.0
                for k in range(0, overlap_len, 4):
                    corr += output[overlap_start + k] * samples[cand_idx + k]
                if corr > best_corr:
                    best_corr = corr
                    best_offset = delta

        actual_in = in_pos + best_offset
        if actual_in < 0 or actual_in + win_len >= len(samples):
            actual_in = in_pos

        for n in range(win_len):
            output[out_pos + n] += samples[actual_in + n] * window[n]
            norm[out_pos + n] += window[n]

        in_pos += hop_in
        out_pos += hop_out

    final_samples = []
    for s, n in zip(output[:out_pos], norm[:out_pos]):
        if n > 1e-4:
            final_samples.append(s / n)
        else:
            final_samples.append(s)

    return final_samples

def vocal_master(samples, rate):
    eq_samples = []
    prev = 0.0
    for s in samples:
        enhanced = s + 0.28 * (s - prev)
        eq_samples.append(enhanced)
        prev = s

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

    peak = max(abs(s) for s in compressed) or 1.0
    target_peak = 30000.0
    gain = target_peak / peak

    return [s * gain for s in compressed]

def generate_word_timings(narration, total_duration):
    tokens = narration.strip().split()
    if not tokens:
        return []

    # Calculate token weights
    weights = []
    for t in tokens:
        cleaned = re.sub(r'[^\w\']', '', t)
        base_weight = max(1, len(cleaned))
        # Extra pause after punctuation
        extra_pause = 0
        if t.endswith(('.', '?', '!')):
            extra_pause = 3.5
        elif t.endswith((',', ';', '—', ':')):
            extra_pause = 2.0
        weights.append(base_weight + extra_pause)

    total_weight = sum(weights)
    lead_in = 0.08
    effective_duration = max(0.5, total_duration - lead_in - 0.12)

    words = []
    cursor = lead_in

    for i, token in enumerate(tokens):
        cleaned_text = re.sub(r'[^\w\']', '', token)
        share = (weights[i] / total_weight) * effective_duration
        # Word speech is 82% of share, rest is inter-word gap
        word_dur = share * 0.82
        start_sec = round(cursor, 3)
        end_sec = round(cursor + word_dur, 3)

        words.append({
            "text": cleaned_text if cleaned_text else token,
            "startSec": start_sec,
            "endSec": end_sec
        })

        cursor += share

    return words

def main():
    with open(SCRIPT_PATH, 'r', encoding='utf-8') as f:
        script = json.load(f)

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    manifest['uz'] = manifest.get('uz', {})

    uz_scenes = {s['id']: s for s in script['locales']['uz']['scenes']}

    print('=== PROCESSING 6 SCENES WITH AUDIO ENHANCER ===')

    for item in SCENE_MAPPING:
        scene_id = item['id']
        in_file = os.path.join(MYVOICE_DIR, item['file'])
        out_wav = os.path.join(OUT_AUDIO_DIR, f"{scene_id}.wav")

        print(f"\n--- Scene: {scene_id} ---")
        samples, rate = load_wav(in_file)
        in_dur = len(samples) / rate
        print(f"  Input: {in_dur:.2f}s ({item['file']})")

        trimmed = compress_silences(samples, rate, max_silence_ms=item['max_silence_ms'])
        trim_dur = len(trimmed) / rate
        print(f"  Silence compressed: {trim_dur:.2f}s (saved {in_dur - trim_dur:.2f}s)")

        stretched = wsola_timestretch(trimmed, rate, speed=item['speed'])
        stretch_dur = len(stretched) / rate
        print(f"  Time-stretched ({item['speed']}x): {stretch_dur:.2f}s")

        mastered = vocal_master(stretched, rate)
        save_wav(out_wav, mastered, rate)
        print(f"  Saved WAV: {out_wav}")

        # Also create .m4a as backup
        out_m4a = os.path.join(OUT_AUDIO_DIR, f"{scene_id}.m4a")
        cmd = ['afconvert', '-f', 'm4af', '-d', 'aac', out_wav, out_m4a]
        subprocess.run(cmd, check=True)

        narration = uz_scenes[scene_id]['narration']
        words = generate_word_timings(narration, stretch_dur)

        rel_path = f"lessons/lesson-01-intro/audio/uz/{scene_id}.wav"
        manifest['uz'][scene_id] = {
            "file": rel_path,
            "durationSec": round(stretch_dur, 2),
            "words": words
        }
        print(f"  Manifest updated: {stretch_dur:.2f}s, {len(words)} words")

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print("\nAudio manifest saved successfully!")

if __name__ == '__main__':
    main()
