import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EdgeTTS, Constants } from '@andresaya/edge-tts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const LESSONS_DIR = path.join(ROOT_DIR, 'src', 'lessons');
const PUBLIC_LESSONS_DIR = path.join(ROOT_DIR, 'public', 'lessons');

const DEFAULT_VOICES = {
  uz: 'uz-UZ-SardorNeural',
  ru: 'ru-RU-DmitryNeural',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(argv) {
  const args = {
    lesson: null,
    locale: null,
    force: false,
    voiceUz: process.env.TTS_VOICE_UZ || DEFAULT_VOICES.uz,
    voiceRu: process.env.TTS_VOICE_RU || DEFAULT_VOICES.ru,
    rate: process.env.TTS_RATE || '+0%',
    pitch: process.env.TTS_PITCH || '+0Hz',
    volume: process.env.TTS_VOLUME || '+0%',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];
    if (token === '--lesson' && next) {
      args.lesson = next;
      i += 1;
    } else if (token === '--locale' && next) {
      args.locale = next;
      i += 1;
    } else if (token === '--force') {
      args.force = true;
    } else if (token === '--voice-uz' && next) {
      args.voiceUz = next;
      i += 1;
    } else if (token === '--voice-ru' && next) {
      args.voiceRu = next;
      i += 1;
    } else if (token === '--rate' && next) {
      args.rate = next;
      i += 1;
    }
  }

  return args;
}

function extractWordTimings(result, fallbackText, totalDurationSec) {
  if (result.wordBoundaries && result.wordBoundaries.length > 0) {
    return result.wordBoundaries.map((w) => ({
      text: String(w.text).trim(),
      startSec: Number((w.offset / 10_000_000).toFixed(3)),
      endSec: Number(((w.offset + w.duration) / 10_000_000).toFixed(3)),
    })).filter((w) => w.text.length > 0);
  }

  if (result.sentenceBoundaries && result.sentenceBoundaries.length > 0) {
    const expanded = [];
    for (const sentence of result.sentenceBoundaries) {
      const start = sentence.offset / 10_000_000;
      const dur = sentence.duration / 10_000_000;
      const tokens = String(sentence.text).trim().split(/\s+/).filter(Boolean);
      if (tokens.length === 0) continue;
      const totalChars = tokens.reduce((sum, t) => sum + t.length, 0) || 1;
      let cursor = start;
      for (const token of tokens) {
        const share = (token.length / totalChars) * dur;
        expanded.push({
          text: token,
          startSec: Number(cursor.toFixed(3)),
          endSec: Number((cursor + share).toFixed(3)),
        });
        cursor += share;
      }
    }
    if (expanded.length > 0) return expanded;
  }

  const tokens = fallbackText.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const perWord = totalDurationSec / tokens.length;
  return tokens.map((token, idx) => ({
    text: token,
    startSec: Number((idx * perWord).toFixed(3)),
    endSec: Number(((idx + 1) * perWord).toFixed(3)),
  }));
}

async function synthesizeToMp3(tts, text, voice, options, outputPath) {
  const maxAttempts = 6;
  let result;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      result = await tts.generate(text, voice, {
        rate: options.rate,
        pitch: options.pitch,
        volume: options.volume,
        outputFormat: Constants.OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3,
      });
      break;
    } catch (err) {
      const msg = String(err?.message || err);
      const isRetryable =
        msg.includes('429') || msg.includes('ECONNRESET') || msg.includes('timeout');
      if (!isRetryable || attempt === maxAttempts) {
        throw err;
      }
      const waitMs = attempt * 4000;
      console.log(`  Rate limited (attempt ${attempt}/${maxAttempts}), retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
    }
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, result.audio);

  let durationSec = Number(result.duration.toFixed(2));
  const boundaries =
    result.wordBoundaries?.length > 0
      ? result.wordBoundaries
      : result.sentenceBoundaries || [];

  if (boundaries.length > 0) {
    const last = boundaries[boundaries.length - 1];
    const boundaryEndSec = (last.offset + last.duration) / 10_000_000;
    if (boundaryEndSec > 0) {
      durationSec = Number(boundaryEndSec.toFixed(2));
    }
  }

  const words = extractWordTimings(result, text, durationSec);

  return { bytes: result.audio.length, durationSec, words };
}

async function discoverLessons(filterLesson) {
  const entries = await fs.readdir(LESSONS_DIR, { withFileTypes: true });
  const lessons = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (filterLesson && entry.name !== filterLesson) continue;

    const scriptPath = path.join(LESSONS_DIR, entry.name, 'script.json');
    try {
      await fs.access(scriptPath);
      lessons.push(entry.name);
    } catch {
      // Skip folders without script.json
    }
  }

  return lessons;
}

async function processLesson(tts, lessonId, options) {
  const lessonDir = path.join(LESSONS_DIR, lessonId);
  const scriptPath = path.join(lessonDir, 'script.json');
  const manifestPath = path.join(lessonDir, 'audio-manifest.json');

  const script = JSON.parse(await fs.readFile(scriptPath, 'utf-8'));

  let manifest = { uz: {}, ru: {} };
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
  } catch {
    // Initialize fresh manifest
  }

  const targetLocales = options.locale
    ? [options.locale]
    : Object.keys(script.locales);

  for (const locale of targetLocales) {
    const content = script.locales[locale];
    if (!content) {
      console.warn(`Skipping unknown locale "${locale}" for ${lessonId}`);
      continue;
    }

    const voice = locale === 'uz' ? options.voiceUz : options.voiceRu;
    const scenes = Array.isArray(content.scenes)
      ? content.scenes
      : [content.intro, ...(content.steps || []), content.outro].filter(Boolean);

    manifest[locale] = manifest[locale] || {};

    console.log(`\n[${lessonId}] Generating ${locale.toUpperCase()} audio with ${voice}...`);

    for (const scene of scenes) {
      if (!scene.narration) continue;

      const relativePublicPath = `lessons/${lessonId}/audio/${locale}/${scene.id}.mp3`;
      const absoluteOutputPath = path.join(
        PUBLIC_LESSONS_DIR,
        lessonId,
        'audio',
        locale,
        `${scene.id}.mp3`,
      );

      if (
        !options.force &&
        manifest[locale]?.[scene.id]?.file &&
        Array.isArray(manifest[locale]?.[scene.id]?.words) &&
        manifest[locale][scene.id].words.length > 0
      ) {
        try {
          await fs.access(absoluteOutputPath);
          console.log(`  SKIP ${scene.id.padEnd(11)} -> already exists (use --force to regenerate)`);
          continue;
        } catch {
          // File missing on disk, regenerate
        }
      }

      const { bytes, durationSec, words } = await synthesizeToMp3(
        tts,
        scene.narration,
        voice,
        { rate: options.rate, pitch: options.pitch, volume: options.volume },
        absoluteOutputPath,
      );

      manifest[locale][scene.id] = {
        file: relativePublicPath,
        durationSec,
        words,
      };

      await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');

      console.log(
        `  OK   ${scene.id.padEnd(11)} -> public/${relativePublicPath} (${durationSec}s, ${words.length} words, ${(bytes / 1024).toFixed(1)} KB)`,
      );

      await sleep(2000);
    }
  }

  console.log(`\nUpdated manifest: src/lessons/${lessonId}/audio-manifest.json`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const lessons = await discoverLessons(options.lesson);

  if (lessons.length === 0) {
    console.error('No matching lessons with script.json found.');
    process.exit(1);
  }

  const tts = new EdgeTTS();

  for (const lessonId of lessons) {
    await processLesson(tts, lessonId, options);
  }

  console.log('\nDone! Open Remotion Studio (`npm run dev`) to preview with voice & karaoke subtitles.');
}

main().catch((err) => {
  console.error('\nTTS generation failed:', err.message || err);
  process.exit(1);
});
