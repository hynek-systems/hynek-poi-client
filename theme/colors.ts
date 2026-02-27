/**
 * HSL color system
 *
 * Format: hsl(hue saturation lightness)
 * Example: hsl(221 83% 53%)
 */

export const colors = {
  // Brand (blue)
  primary: 'hsl(221 83% 53%)',
  primaryHover: 'hsl(221 83% 48%)',
  primaryActive: 'hsl(221 83% 43%)',
  primarySubtle: 'hsl(221 83% 96%)',

  // Backgrounds
  background: 'hsl(0 0% 100%)',
  backgroundSecondary: 'hsl(210 20% 98%)',
  backgroundTertiary: 'hsl(210 16% 96%)',

  // Text
  text: 'hsl(222 47% 11%)',
  textSecondary: 'hsl(215 16% 47%)',
  textTertiary: 'hsl(215 20% 65%)',
  textInverse: 'hsl(0 0% 100%)',

  // Borders
  border: 'hsl(214 32% 91%)',
  borderStrong: 'hsl(214 25% 84%)',

  // Status
  success: 'hsl(142 71% 45%)',
  successSubtle: 'hsl(142 71% 96%)',

  warning: 'hsl(38 92% 50%)',
  warningSubtle: 'hsl(48 96% 89%)',

  danger: 'hsl(0 84% 60%)',
  dangerSubtle: 'hsl(0 93% 94%)',

  info: 'hsl(221 83% 53%)',
  infoSubtle: 'hsl(221 83% 96%)',

  // Neutral scale (very useful)
  gray50: 'hsl(210 20% 98%)',
  gray100: 'hsl(220 14% 96%)',
  gray200: 'hsl(220 13% 91%)',
  gray300: 'hsl(216 12% 84%)',
  gray400: 'hsl(218 11% 65%)',
  gray500: 'hsl(220 9% 46%)',
  gray600: 'hsl(215 14% 34%)',
  gray700: 'hsl(217 19% 27%)',
  gray800: 'hsl(215 28% 17%)',
  gray900: 'hsl(222 47% 11%)',

  overlay: 'hsla(0 0% 0% / 0.4)',
} as const
