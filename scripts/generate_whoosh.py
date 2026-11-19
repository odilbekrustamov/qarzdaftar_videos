import wave
import struct
import math
import random
import os

rate = 44100
duration = 0.28
num_samples = int(rate * duration)

random.seed(42)
# Generate white noise
noise = [random.uniform(-1.0, 1.0) for _ in range(num_samples)]

# Dynamic sweep: center freq sweeps from 400Hz -> 2200Hz -> 300Hz
output = []
y1 = 0.0
y2 = 0.0

for i in range(num_samples):
    t = i / num_samples
    # Bell curve envelope
    env = math.sin(t * math.pi) ** 2
    
    # Sweep center frequency
    cf = 400.0 + 1800.0 * math.sin(t * math.pi)
    bw = cf * 0.45
    
    # Simple 2-pole resonant bandpass filter
    w0 = 2.0 * math.pi * cf / rate
    alpha = math.sin(w0) * math.sinh(math.log(2.0) / 2.0 * bw * w0 / math.sin(w0))
    b0 = alpha
    b2 = -alpha
    a0 = 1.0 + alpha
    a1 = -2.0 * math.cos(w0)
    a2 = 1.0 - alpha
    
    # Normalized
    b0 /= a0
    b2 /= a0
    a1 /= a0
    a2 /= a0
    
    x0 = noise[i]
    x2 = noise[i-2] if i >= 2 else 0.0
    val = b0 * x0 + b2 * x2 - a1 * y1 - a2 * y2
    y2 = y1
    y1 = val
    
    # Apply envelope and soft saturation
    out_val = val * env * 2.8
    out_val = math.tanh(out_val) * 22000.0
    output.append(int(max(-32767, min(32767, out_val))))

os.makedirs('qarzdaftar_videos/public/audio', exist_ok=True)
with wave.open('qarzdaftar_videos/public/audio/whoosh.wav', 'wb') as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(rate)
    f.writeframes(struct.pack(f'<{len(output)}h', *output))

print('Generated whoosh.wav!')
