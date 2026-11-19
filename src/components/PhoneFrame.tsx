import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../theme/brand';

interface PhoneFrameProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  statusTime?: string;
  animateEntrance?: boolean;
}

/**
 * True Android Device Mockup (Material 3 Android Flagship)
 * Centered punch-hole front camera, Android Status Bar, Material 3 gesture pill.
 */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  width = 620,
  height = 1240,
  statusTime = '12:45',
  animateEntrance = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = animateEntrance
    ? spring({
        frame,
        fps,
        config: { damping: 18, stiffness: 120 },
      })
    : 1;

  const translateY = animateEntrance ? interpolate(entrance, [0, 1], [36, 0]) : 0;
  const scale = animateEntrance ? interpolate(entrance, [0, 1], [0.96, 1]) : 1;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 50,
        padding: 12,
        background: 'linear-gradient(155deg, #2D3748 0%, #1A202C 50%, #111827 100%)',
        boxShadow:
          '0 42px 95px rgba(15, 23, 42, 0.28), 0 14px 32px rgba(18, 53, 91, 0.16), inset 0 0 0 1.5px rgba(255, 255, 255, 0.14)',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: entrance,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Inner Android screen */}
      <div
        style={{
          flex: 1,
          borderRadius: 40,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: BRAND.fontFamily,
        }}
      >
        {/* Android Material 3 Status Bar */}
        <div
          style={{
            height: 44,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            flexShrink: 0,
            zIndex: 10,
            position: 'relative',
          }}
        >
          {/* Left: Android Clock */}
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#171D1E',
              letterSpacing: 0.2,
            }}
          >
            {statusTime}
          </span>

          {/* Center: Android Punch-hole Camera */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#0B0F14',
              boxShadow: 'inset 0 0 0 2px #1E293B',
            }}
          />

          {/* Right: Android Wi-Fi, 4G, Battery */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#171D1E' }}>
            {/* Wi-Fi Icon */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" fill="currentColor" />
            </svg>

            {/* 4G / LTE text badge */}
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.4px' }}>4G</span>

            {/* Android Battery */}
            <div
              style={{
                width: 22,
                height: 12,
                borderRadius: 3,
                border: '1.6px solid #171D1E',
                padding: 1.5,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '85%',
                  height: '100%',
                  borderRadius: 1,
                  backgroundColor: '#171D1E',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: -3.5,
                  top: 3,
                  bottom: 3,
                  width: 2,
                  borderRadius: '0 1px 1px 0',
                  backgroundColor: '#171D1E',
                }}
              />
            </div>
          </div>
        </div>

        {/* Android App viewport */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F6F7F8',
          }}
        >
          {children}
        </div>

        {/* Android Navigation Gesture Bar */}
        <div
          style={{
            height: 20,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 104,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#94A3B8',
            }}
          />
        </div>
      </div>
    </div>
  );
};
