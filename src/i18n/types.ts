export type Locale = 'uz' | 'ru';

export type AspectRatio = 'vertical' | 'landscape';

export interface WordTiming {
  text: string;
  startSec: number;
  endSec: number;
}

export interface SceneScript {
  id: string;
  durationSec: number;
  title: string;
  narration: string;
}

export interface LessonLocaleContent {
  lessonBadge: string;
  brandTitle: string;
  brandHandle: string;
  watermark?: string;
  scenes: SceneScript[];
}

export interface LessonScript {
  lessonId: string;
  lessonNumber: number;
  fps: number;
  locales: Record<Locale, LessonLocaleContent>;
}

export interface SceneAudioEntry {
  file: string;
  durationSec?: number;
  words?: WordTiming[];
}

export type AudioManifest = Record<Locale, Record<string, SceneAudioEntry>>;

export const DEFAULT_TTS_VOICES: Record<Locale, string> = {
  uz: 'uz-UZ-SardorNeural',
  ru: 'ru-RU-DmitryNeural',
};
