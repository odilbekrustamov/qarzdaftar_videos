import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { AspectRatio, WordTiming } from '../i18n/types';
import { BRAND } from '../theme/brand';
import { KaraokeSubtitle } from './KaraokeSubtitle';

interface LessonShellProps {
  brandTitle: string;
  brandHandle: string;
  lessonBadge: string;
  sceneTitle: string;
  sceneIndex: number;
  totalScenes: number;
  narration: string;
  words?: WordTiming[];
  sceneDurationFrames: number;
  aspectRatio: AspectRatio;
  children: React.ReactNode;
}

const SubtleRightTexture: React.FC<{ isVertical: boolean }> = ({ isVertical }) => (
  <svg
    width={isVertical ? 260 : 300}
    height={isVertical ? 260 : 300}
    viewBox="0 0 260 260"
    style={{
      position: 'absolute',
      right: isVertical ? -90 : -70,
      top: isVertical ? 540 : 210,
      opacity: 0.16,
      pointerEvents: 'none',
    }}
  >
    <defs>
      <pattern
        id="qd-diag-lines"
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(40)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="14"
          stroke="#1E4E8C"
          strokeWidth="2.4"
        />
      </pattern>
    </defs>
    <circle cx="130" cy="130" r="126" fill="url(#qd-diag-lines)" />
  </svg>
);

export const LessonShell: React.FC<LessonShellProps> = ({
  brandTitle,
  brandHandle,
  lessonBadge,
  sceneTitle,
  sceneIndex,
  totalScenes,
  narration,
  words,
  sceneDurationFrames,
  aspectRatio,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isVertical = aspectRatio === 'vertical';

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 140 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [14, 0]);
  const glowShift = interpolate(frame, [0, Math.max(1, sceneDurationFrames)], [0, 20]);

  return (
    <AbsoluteFill
      style={{
        background: isVertical
          ? `linear-gradient(175deg,
              ${BRAND.colors.canvasTop} 0%,
              #F3F8FF 26%,
              #E1EEFE 46%,
              #93B9F8 65%,
              ${BRAND.colors.primary} 81%,
              ${BRAND.colors.ultramarine} 91%,
              ${BRAND.colors.deepBlue} 100%)`
          : `linear-gradient(145deg,
              ${BRAND.colors.canvasTop} 0%,
              #F2F7FF 38%,
              #D5E6FD 62%,
              #2563EB 84%,
              ${BRAND.colors.deepBlue} 100%)`,
        fontFamily: BRAND.fontFamily,
        overflow: 'hidden',
      }}
    >
      {/* Top airy light clouds for extra depth */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 680,
          height: 520,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(191, 219, 254, 0.45) 0%, rgba(191, 219, 254, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -140,
          right: -120,
          width: 640,
          height: 540,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.36) 0%, rgba(147, 197, 253, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Luminous halo behind central smartphone */}
      <div
        style={{
          position: 'absolute',
          top: isVertical ? 520 + glowShift : 140 + glowShift,
          left: isVertical ? '50%' : '68%',
          transform: 'translateX(-50%)',
          width: isVertical ? 960 : 760,
          height: isVertical ? 960 : 760,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.62) 0%, rgba(219, 234, 254, 0.22) 48%, rgba(26, 86, 219, 0) 72%)',
          pointerEvents: 'none',
        }}
      />

      {/* Rich bottom-right ultramarine depth sweep */}
      <div
        style={{
          position: 'absolute',
          bottom: -240,
          right: -180,
          width: isVertical ? 920 : 1080,
          height: isVertical ? 820 : 740,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(9, 34, 94, 0.72) 0%, rgba(21, 70, 192, 0.35) 52%, rgba(21, 70, 192, 0) 76%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle geometric line accent on right edge */}
      <SubtleRightTexture isVertical={isVertical} />

      {isVertical ? (
        /* ==================== VERTICAL 9:16 LAYOUT ==================== */
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '58px 58px 56px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow:
                    '0 12px 26px rgba(26, 86, 219, 0.28), 0 3px 8px rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Img
                  src={staticFile('common/logo.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1.66)',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontSize: 31,
                    fontWeight: 800,
                    color: BRAND.colors.textPrimary,
                    letterSpacing: 0.6,
                    lineHeight: 1.05,
                  }}
                >
                  {brandTitle}
                </span>
                <span
                  style={{
                    fontSize: 23,
                    fontWeight: 500,
                    color: BRAND.colors.textMuted,
                    lineHeight: 1.15,
                  }}
                >
                  {brandHandle}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '14px 36px',
                borderRadius: 999,
                backgroundColor: BRAND.colors.navyBadge,
                color: '#FFFFFF',
                fontSize: 28,
                fontWeight: 700,
                boxShadow: '0 10px 24px rgba(16, 44, 87, 0.24)',
              }}
            >
              {lessonBadge}
            </div>
          </div>

          {/* Centered Title + Pagination Dots */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 22,
              marginBottom: 20,
              transform: `translateY(${titleY}px)`,
              opacity: titleSpring,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 62,
                fontWeight: 800,
                color: BRAND.colors.navyTitle,
                letterSpacing: -1.4,
                textAlign: 'center',
                lineHeight: 1.12,
                maxWidth: 880,
              }}
            >
              {sceneTitle}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                marginTop: 22,
              }}
            >
              {Array.from({ length: totalScenes }).map((_, idx) => {
                const isActive = idx === sceneIndex;
                const isDone = idx < sceneIndex;
                return (
                  <div
                    key={idx}
                    style={{
                      width: isActive ? 42 : 13,
                      height: 13,
                      borderRadius: 999,
                      backgroundColor: isActive
                        ? BRAND.colors.accentTeal
                        : isDone
                          ? '#94A3B8'
                          : '#BCC8D8',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Center Phone Stage */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {children}
          </div>

          {/* Bottom Deep Navy Subtitle Bar */}
          <div style={{ marginTop: 28 }}>
            <KaraokeSubtitle
              narration={narration}
              words={words}
              sceneDurationFrames={sceneDurationFrames}
              aspectRatio={aspectRatio}
            />
          </div>
        </div>
      ) : (
        /* ==================== LANDSCAPE 16:9 LAYOUT ==================== */
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '44px 76px 48px',
          }}
        >
          {/* Top Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 17,
                  overflow: 'hidden',
                  boxShadow: '0 10px 22px rgba(26, 86, 219, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Img
                  src={staticFile('common/logo.png')}
                  style={{ width: '100%', height: '100%', transform: 'scale(1.66)', objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontSize: 27,
                    fontWeight: 800,
                    color: BRAND.colors.textPrimary,
                    letterSpacing: 0.6,
                  }}
                >
                  {brandTitle}
                </span>
                <span
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    color: BRAND.colors.textMuted,
                  }}
                >
                  {brandHandle}
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '12px 30px',
                borderRadius: 999,
                backgroundColor: BRAND.colors.navyBadge,
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 700,
                boxShadow: '0 8px 20px rgba(16, 44, 87, 0.22)',
              }}
            >
              {lessonBadge}
            </div>
          </div>

          {/* Main Split Area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 80,
            }}
          >
            {/* Left Info & Subtitle Column */}
            <div
              style={{
                flex: 1,
                maxWidth: 900,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 34,
              }}
            >
              <div
                style={{
                  transform: `translateY(${titleY}px)`,
                  opacity: titleSpring,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    marginBottom: 22,
                  }}
                >
                  {Array.from({ length: totalScenes }).map((_, idx) => {
                    const isActive = idx === sceneIndex;
                    const isDone = idx < sceneIndex;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: isActive ? 40 : 12,
                          height: 12,
                          borderRadius: 999,
                          backgroundColor: isActive
                            ? BRAND.colors.accentTeal
                            : isDone
                              ? '#94A3B8'
                              : '#BCC8D8',
                        }}
                      />
                    );
                  })}
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: 70,
                    fontWeight: 800,
                    color: BRAND.colors.navyTitle,
                    letterSpacing: -1.5,
                    lineHeight: 1.1,
                  }}
                >
                  {sceneTitle}
                </h1>
              </div>

              <KaraokeSubtitle
                narration={narration}
                words={words}
                sceneDurationFrames={sceneDurationFrames}
                aspectRatio={aspectRatio}
              />
            </div>

            {/* Right Phone Stage */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 20,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
