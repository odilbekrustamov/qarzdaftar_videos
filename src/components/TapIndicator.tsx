import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { BRAND } from '../theme/brand';

interface TapIndicatorProps {
  x: number;
  y: number;
  startFrame?: number;
  color?: string;
}

export const TapIndicator: React.FC<TapIndicatorProps> = ({
  x,
  y,
  startFrame = 20,
  color = BRAND.colors.primary,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0) {
    return null;
  }

  const cycle = localFrame % 45;
  const ringScale = interpolate(cycle, [0, 35], [0.5, 2.2], {
    extrapolateRight: 'clamp',
  });
  const ringOpacity = interpolate(cycle, [0, 10, 35], [0, 0.75, 0], {
    extrapolateRight: 'clamp',
  });
  const dotScale = interpolate(cycle, [0, 8, 16], [1, 0.82, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `3px solid ${color}`,
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 18px ${color}`,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
        }}
      />
    </div>
  );
};
