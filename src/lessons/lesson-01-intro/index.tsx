import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { z } from 'zod';
import { AudioManifest, LessonScript, Locale } from '../../i18n/types';
import { LessonShell } from '../../components/LessonShell';
import { PhoneFrame } from '../../components/PhoneFrame';
import {
  AnimatedAnalyticsScreen,
  AnimatedHomeScreen,
  AnimatedInstallmentScreen,
  AnimatedOutroScreen,
  AnimatedQuickDebtScreen,
  AnimatedSuppliersScreen,
} from './AnimatedPhoneScreens';
import rawScript from './script.json';
import rawAudioManifest from './audio-manifest.json';

const lessonScript = rawScript as LessonScript;
const audioManifest = rawAudioManifest as AudioManifest;

export const lesson01Schema = z.object({
  locale: z.enum(['uz', 'ru']),
  aspectRatio: z.enum(['vertical', 'landscape']),
});

export type Lesson01Props = z.infer<typeof lesson01Schema>;

const PHONE_BASE_WIDTH = 620;
const PHONE_BASE_HEIGHT = 1240;
const LANDSCAPE_PHONE_SCALE = 0.69;

const getSceneDurationFrames = (
  locale: Locale,
  sceneId: string,
  fallbackSec: number,
  fps: number,
): number => {
  const audioEntry = audioManifest[locale]?.[sceneId];
  // Natural dignified pacing: audio duration + 0.35s breathing room (unhurried and confident)
  const targetSec = audioEntry?.durationSec
    ? audioEntry.durationSec + 0.35
    : fallbackSec;
  return Math.round(targetSec * fps);
};

export const getLesson01DurationInFrames = (locale: Locale): number => {
  const content = lessonScript.locales[locale];
  const fps = lessonScript.fps;
  return content.scenes.reduce(
    (sum, scene) =>
      sum + getSceneDurationFrames(locale, scene.id, scene.durationSec, fps),
    0,
  );
};

const renderPhoneScreen = (sceneId: string, locale: Locale): React.ReactNode => {
  switch (sceneId) {
    case 'intro':
      return <AnimatedHomeScreen locale={locale} />;
    case 'quick-debt':
      return <AnimatedQuickDebtScreen locale={locale} />;
    case 'installment':
      return <AnimatedInstallmentScreen locale={locale} />;
    case 'suppliers':
      return <AnimatedSuppliersScreen locale={locale} />;
    case 'analytics':
      return <AnimatedAnalyticsScreen locale={locale} />;
    case 'outro':
      return <AnimatedOutroScreen locale={locale} />;
    default:
      return <AnimatedHomeScreen locale={locale} />;
  }
};

export const Lesson01Intro: React.FC<Lesson01Props> = ({
  locale,
  aspectRatio,
}) => {
  const content = lessonScript.locales[locale];
  const fps = lessonScript.fps;
  const isVertical = aspectRatio === 'vertical';

  const durations = content.scenes.map((scene) =>
    getSceneDurationFrames(locale, scene.id, scene.durationSec, fps),
  );

  let cursor = 0;
  const starts = durations.map((dur) => {
    const start = cursor;
    cursor += dur;
    return start;
  });
  const totalFrames = cursor;

  return (
    <AbsoluteFill>
      {/* Background music: continuous warm acoustic piano melody at 8% volume with smooth fade in/out */}
      <Audio
        src={staticFile('audio/bg-music.mp3')}
        volume={(f) => {
          const baseVol = 0.08;
          if (f < 20) return (f / 20) * baseVol;
          if (f > totalFrames - 30) return Math.max(0, ((totalFrames - f) / 30) * baseVol);
          return baseVol;
        }}
        loop
      />

      {content.scenes.map((scene, index) => {
        const audioEntry = audioManifest[locale]?.[scene.id];
        const durationInFrames = durations[index];

        const phoneElement = (
          <PhoneFrame
            width={PHONE_BASE_WIDTH}
            height={PHONE_BASE_HEIGHT}
            animateEntrance={index === 0}
          >
            {renderPhoneScreen(scene.id, locale)}
          </PhoneFrame>
        );

        return (
          <Sequence
            key={scene.id}
            from={starts[index]}
            durationInFrames={durationInFrames}
          >
            {/* Soft whoosh sfx on scene transition */}
            {index > 0 ? (
              <Sequence from={0} durationInFrames={10}>
                <Audio src={staticFile('audio/whoosh.wav')} volume={0.15} />
              </Sequence>
            ) : null}

            <LessonShell
              brandTitle={content.brandTitle}
              brandHandle={content.brandHandle}
              lessonBadge={content.lessonBadge}
              sceneTitle={scene.title}
              sceneIndex={index}
              totalScenes={content.scenes.length}
              narration={scene.narration}
              words={audioEntry?.words}
              sceneDurationFrames={durationInFrames}
              aspectRatio={aspectRatio}
            >
              {isVertical ? (
                phoneElement
              ) : (
                <div
                  style={{
                    width: Math.round(PHONE_BASE_WIDTH * LANDSCAPE_PHONE_SCALE),
                    height: Math.round(PHONE_BASE_HEIGHT * LANDSCAPE_PHONE_SCALE),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      transform: `scale(${LANDSCAPE_PHONE_SCALE})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    {phoneElement}
                  </div>
                </div>
              )}
            </LessonShell>

            {audioEntry?.file ? <Audio src={staticFile(audioEntry.file)} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
