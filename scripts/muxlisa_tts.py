#!/usr/bin/env python3
"""
Muxlisa.uz TTS Integration Script for QarzDaftar Video Lessons
Speaker 1: Asomiddin (Mature, deep, authoritative Uzbek male voice)
Speaker 0: Maftuna (Natural Uzbek female voice)
"""

import sys
import os
import json
import urllib.request
import urllib.error
import ssl

DEFAULT_KEY = "QoMXrXfWBAjSEM1YbRt1xBmTXfi1VnkrolbR6IRK"
API_URL = "https://service.muxlisa.uz/api/v2/tts"

def synthesize(text, speaker=1, api_key=None, output_path=None):
    key = api_key or os.environ.get("MUXLISA_API_KEY", DEFAULT_KEY)
    headers = {
        "Content-Type": "application/json",
        "x-api-key": key,
        "User-Agent": "Mozilla/5.0"
    }
    payload = json.dumps({
        "text": text,
        "speaker": speaker
    }).encode("utf-8")
    
    ctx = ssl.create_default_context()
    req = urllib.request.Request(API_URL, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
            data = resp.read()
            if output_path:
                os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
                with open(output_path, "wb") as f:
                    f.write(data)
                print(f"[OK] Audio saved ({len(data)} bytes) -> {output_path}")
            return data
    except urllib.error.HTTPError as e:
        print(f"[HTTP {e.code}] Error: {e.read().decode('utf-8')}", file=sys.stderr)
        raise
    except Exception as e:
        print(f"[ERROR] {e}", file=sys.stderr)
        raise

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 muxlisa_tts.py \"Matn...\" output.wav [speaker_id]")
        sys.exit(1)
    text = sys.argv[1]
    out = sys.argv[2]
    spk = int(sys.argv[3]) if len(sys.argv) > 3 else 1
    synthesize(text, speaker=spk, output_path=out)
