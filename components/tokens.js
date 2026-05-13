// Design Tokens v2 — WillisApp Pastel/White Medical UI
const T = {
  // Base
  bg: '#FFFFFF',
  bgAlt: '#F7F8FC',
  border: '#EDEEF2',

  // Primary teal (from reference)
  primary: '#1A9BAF',
  primaryLight: '#E8F7FA',
  primaryMid: '#1589A0',

  // Accent blue
  accent: '#2563EB',
  accentLight: '#EFF4FF',

  // Pastel tile colors (service icons)
  tileBlue:   { bg: '#DFF0FA', fg: '#1A7EAF' },
  tileYellow: { bg: '#FEF3D0', fg: '#C98B00' },
  tileTeal:   { bg: '#D7F5EE', fg: '#0E9B72' },
  tilePink:   { bg: '#FCE8F3', fg: '#C4398A' },
  tilePurple: { bg: '#EDE9FB', fg: '#6B4FCF' },
  tileOrange: { bg: '#FEE8D6', fg: '#D4600A' },
  tileGreen:  { bg: '#DCFCE7', fg: '#16A34A' },

  // Semantic
  success: '#0E9B72',
  successLight: '#D7F5EE',
  warning: '#C98B00',
  warningLight: '#FEF3D0',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',

  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  white: '#FFFFFF',

  // Typography
  fontSans: "'Plus Jakarta Sans', 'DM Sans', 'Helvetica Neue', sans-serif",

  // Radius
  radiusCard: '18px',
  radiusTile: '16px',
  radiusInput: '12px',
  radiusPill: '100px',
  radiusSm: '8px',

  // Shadows — very soft
  shadowSm: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
  shadowMd: '0 4px 12px rgba(0,0,0,0.07)',
  shadowLg: '0 8px 24px rgba(0,0,0,0.09)',
};

Object.assign(window, { T });
