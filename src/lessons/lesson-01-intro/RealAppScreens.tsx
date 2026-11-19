import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { Locale } from '../../i18n/types';
import { BRAND } from '../../theme/brand';
import { TapIndicator } from '../../components/TapIndicator';

interface ScreenProps {
  locale: Locale;
}

const UI_TEXTS = {
  uz: {
    welcomeBadge: 'QarzDaftar v1.0',
    outroTitle: 'QarzDaftar bilan boshlang!',
    outroSub: "Do'koningizdagi barcha qarz va to'lovlarni bugunoq tartibga soling.",
    playStoreLabel: "Google Play'dan yuklab oling",
    nextLessonLabel: 'KEYINGI DARS',
    nextLessonTitle: "2-dars: Do'kon sozlash va xodimlarni boshqarish",
  },
  ru: {
    welcomeBadge: 'QarzDaftar v1.0',
    outroTitle: 'Начните с QarzDaftar!',
    outroSub: 'Наведите полный порядок в долгах и оплатах уже сегодня.',
    playStoreLabel: 'Доступно в Google Play',
    nextLessonLabel: 'СЛЕДУЮЩИЙ УРОК',
    nextLessonTitle: 'Урок 2: Настройка магазина и управление сотрудниками',
  },
} as const;

/**
 * Reusable container that displays a 1:1 real Compose screenshot
 * with optional smooth scroll/pan, zoom, and interactive tap indicator.
 */
interface CapturedScreenProps {
  imageName: string;
  locale: Locale;
  zoom?: { from: number; to: number };
  scrollDeltaY?: number;
  tap?: { x: number; y: number; startFrame: number; color?: string };
}

const CapturedScreen: React.FC<CapturedScreenProps> = ({
  imageName,
  locale,
  zoom,
  scrollDeltaY = 0,
  tap,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = zoom
    ? interpolate(frame, [0, durationInFrames], [zoom.from, zoom.to], {
        extrapolateRight: 'clamp',
      })
    : 1;

  const translateY = scrollDeltaY !== 0
    ? interpolate(frame, [0, durationInFrames], [0, scrollDeltaY], {
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'top center',
        }}
      >
        <Img
          src={staticFile(`lessons/lesson-01-intro/screens/${locale}/${imageName}`)}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {tap && (
        <TapIndicator
          x={tap.x}
          y={tap.y}
          startFrame={tap.startFrame}
          color={tap.color || BRAND.colors.primary}
        />
      )}
    </div>
  );
};

// Scene 1: Introduction - Real Home Dashboard overview
export const RealIntroScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badgeSpring = spring({ frame: frame - 10, fps, config: { damping: 15 } });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CapturedScreen
        imageName="home.png"
        locale={locale}
        zoom={{ from: 1.04, to: 1.0 }}
      />

      {/* Floating brand chip at top */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: '50%',
          transform: `translateX(-50%) scale(${interpolate(badgeSpring, [0, 1], [0.7, 1])})`,
          opacity: badgeSpring,
          padding: '8px 20px',
          borderRadius: 999,
          backgroundColor: 'rgba(26, 86, 219, 0.92)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 700,
          boxShadow: '0 8px 20px rgba(26, 86, 219, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 15,
        }}
      >
        <Sparkles size={14} />
        {UI_TEXTS[locale].welcomeBadge}
      </div>
    </div>
  );
};

// Scene 2: Debt List (matches user's reference image 1:1)
export const RealDebtListScreen: React.FC<ScreenProps> = ({ locale }) => {
  return (
    <CapturedScreen
      imageName="debt-list.png"
      locale={locale}
      // Tap indicator pulses over the blue "+" floating action button at the bottom right
      tap={{ x: 516, y: 1060, startFrame: 35, color: '#1A56DB' }}
    />
  );
};

// Scene 3: Add Debt Screen
export const RealAddDebtScreen: React.FC<ScreenProps> = ({ locale }) => {
  return (
    <CapturedScreen
      imageName="add-debt.png"
      locale={locale}
      // Tap indicator pulses on the bottom "Saqlash" button
      tap={{ x: 290, y: 1060, startFrame: 40, color: '#1A56DB' }}
    />
  );
};

// Scene 4: SMS Reminder & Payment details
export const RealSmsAndPaymentScreen: React.FC<ScreenProps> = ({ locale }) => {
  return (
    <CapturedScreen
      imageName="sms-payment.png"
      locale={locale}
      // Tap indicator pulses on the green "To'lov qilish" button
      tap={{ x: 290, y: 1060, startFrame: 45, color: '#16A34A' }}
    />
  );
};

// Scene 5: Statistics & Analytics Dashboard
export const RealStatisticsScreen: React.FC<ScreenProps> = ({ locale }) => {
  return (
    <CapturedScreen
      imageName="statistics.png"
      locale={locale}
      // Gentle scroll down to show the full chart and KPI cards
      scrollDeltaY={-30}
    />
  );
};

// Scene 6: Outro & Call-to-action
export const RealOutroScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const nextPop = spring({ frame: frame - 18, fps, config: { damping: 16 } });

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        background: 'linear-gradient(180deg, #F8FBFF 0%, #E8F1FD 100%)',
        padding: '64px 32px 42px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 38,
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 24px 50px rgba(26, 86, 219, 0.24)',
            transform: `scale(${interpolate(pop, [0, 1], [0.78, 1])})`,
            opacity: pop,
            marginBottom: 28,
          }}
        >
          <Img
            src={staticFile('common/logo.png')}
            style={{ width: '100%', height: '100%', transform: 'scale(1.42)', objectFit: 'contain' }}
          />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: BRAND.colors.navy,
            letterSpacing: -0.7,
          }}
        >
          {t.outroTitle}
        </h2>

        <p
          style={{
            margin: '16px 0 32px',
            fontSize: 19,
            lineHeight: 1.45,
            color: BRAND.colors.textSecondary,
          }}
        >
          {t.outroSub}
        </p>

        <div
          style={{
            padding: '18px 34px',
            borderRadius: 20,
            background: `linear-gradient(135deg, ${BRAND.colors.accent} 0%, ${BRAND.colors.accentLight} 100%)`,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 16px 32px rgba(22, 163, 74, 0.34)',
          }}
        >
          <ShieldCheck size={24} />
          {t.playStoreLabel}
        </div>
      </div>

      {/* Next lesson teaser card */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: '22px 24px',
          textAlign: 'left',
          boxShadow: '0 12px 28px rgba(18, 53, 91, 0.08)',
          border: `1.5px solid ${BRAND.colors.primarySoft}`,
          transform: `translateY(${interpolate(nextPop, [0, 1], [24, 0])}px)`,
          opacity: nextPop,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 800,
            color: BRAND.colors.primary,
            letterSpacing: 0.8,
            marginBottom: 8,
          }}
        >
          <Sparkles size={16} />
          {t.nextLessonLabel}
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: BRAND.colors.navy, lineHeight: 1.35 }}>
          {t.nextLessonTitle}
        </div>
      </div>
    </div>
  );
};
