import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});

export const BRAND = {
  name: 'QARZ DAFTAR',
  handle: '@qarzdaftar_official',
  fontFamily,
  colors: {
    // Core QarzDaftar brand colors
    primary: '#1A56DB',
    primaryLight: '#3B82F6',
    primarySoft: '#DBEAFE',
    ultramarine: '#1546C0',
    deepBlue: '#09225E',
    navy: '#0F2B54',
    navyBadge: '#102C57',
    navyTitle: '#0D244B',
    accent: '#16A34A',
    accentTeal: '#10B981',
    accentLight: '#22C55E',
    accentSoft: '#DCFCE7',
    gold: '#FACC15',
    problem: '#DC2626',
    problemSoft: '#FEE2E2',
    warning: '#D97706',
    warningSoft: '#FEF3C7',

    // Top studio sky tones
    canvasTop: '#FAFCFF',
    canvasIce: '#EBF3FE',

    // Surfaces & typography
    surface: '#FFFFFF',
    surfaceMuted: '#F4F7FB',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textOnDark: '#FFFFFF',
    border: '#E2E8F0',
  },
} as const;

export const VIDEO_DIMENSIONS = {
  vertical: { width: 1080, height: 1920 },
  landscape: { width: 1920, height: 1080 },
} as const;
