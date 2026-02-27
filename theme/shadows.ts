import { Platform } from 'react-native'

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    },
  }),

  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
    },
  }),

  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
    },
  }),
} as const
