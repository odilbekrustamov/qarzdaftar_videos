import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { AspectRatio, WordTiming } from '../i18n/types';
import { BRAND } from '../theme/brand';

interface KaraokeSubtitleProps {
  narration: string;
  words?: WordTiming[];
  sceneDurationFrames: number;
  aspectRatio: AspectRatio;
}

interface WordChunk {
  words: WordTiming[];
  startSec: number;
  endSec: number;
}

const buildFallbackTimings = (narration: string, totalSec: number): WordTiming[] => {
  const tokens = narration.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const speakDuration = Math.max(0.5, totalSec - 0.5);
  const perWord = speakDuration / tokens.length;

  return tokens.map((text, index) => ({
    text,
    startSec: Number((index * perWord).toFixed(3)),
    endSec: Number(((index + 1) * perWord).toFixed(3)),
  }));
};

const groupWordsIntoChunks = (words: WordTiming[], maxChars = 30, maxWords = 4): WordChunk[] => {
  const chunks: WordChunk[] = [];
  let current: WordTiming[] = [];
  let currentChars = 0;

  const flush = () => {
    if (current.length === 0) return;
    chunks.push({
      words: current,
      startSec: current[0].startSec,
      endSec: current[current.length - 1].endSec,
    });
    current = [];
    currentChars = 0;
  };

  for (const word of words) {
    const nextChars = currentChars + (current.length > 0 ? 1 : 0) + word.text.length;
    const endsSentence = /[.!?]$/.test(word.text);

    if (current.length > 0 && (current.length >= maxWords || nextChars > maxChars)) {
      flush();
    }

    current.push(word);
    currentChars += (current.length > 1 ? 1 : 0) + word.text.length;

    if (endsSentence && current.length >= 2) {
      flush();
    }
  }

  flush();
  return chunks;
};

export const KaraokeSubtitle: React.FC<KaraokeSubtitleProps> = ({
  narration,
  words,
  sceneDurationFrames,
  aspectRatio,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;
  const totalSec = sceneDurationFrames / fps;
  const isVertical = aspectRatio === 'vertical';

  const chunks = useMemo(() => {
    const timedWords =
      words && words.length > 0
        ? words
        : buildFallbackTimings(narration, totalSec);
    return groupWordsIntoChunks(timedWords, isVertical ? 28 : 34, isVertical ? 4 : 5);
  }, [words, narration, totalSec, isVertical]);

  if (chunks.length === 0) {
    return null;
  }

  // Pick the active chunk (stay on last chunk at the very end of the scene)
  let activeChunkIndex = chunks.findIndex(
    (chunk, idx) =>
      currentSec <= chunk.endSec ||
      (idx < chunks.length - 1 && currentSec < chunks[idx + 1].startSec),
  );
  if (activeChunkIndex === -1) {
    activeChunkIndex = chunks.length - 1;
  }

  const activeChunk = chunks[activeChunkIndex];

  return (
    <div
      style={{
        width: '100%',
        minHeight: isVertical ? 106 : 92,
        padding: isVertical ? '22px 38px' : '18px 34px',
        borderRadius: 24,
        backgroundColor: BRAND.colors.navy,
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 22px 50px rgba(4, 15, 42, 0.48), 0 6px 16px rgba(4, 15, 42, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: BRAND.fontFamily,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0 12px',
          fontSize: isVertical ? 42 : 34,
          lineHeight: 1.28,
          letterSpacing: -0.4,
        }}
      >
        {activeChunk.words.map((word, index) => {
          const isActive =
            currentSec >= word.startSec - 0.04 && currentSec <= word.endSec + 0.08;
          const isSpoken = currentSec > word.endSec + 0.08;

          return (
            <span
              key={`${activeChunkIndex}-${index}`}
              style={{
                color: isActive
                  ? '#FFFFFF'
                  : isSpoken
                    ? 'rgba(255, 255, 255, 0.84)'
                    : 'rgba(255, 255, 255, 0.44)',
                fontWeight: isActive ? 800 : 600,
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                display: 'inline-block',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
