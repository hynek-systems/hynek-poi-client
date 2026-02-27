import { Platform, TextStyle } from 'react-native'

const fontFamily = Platform.select({
  ios: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  android: 'Roboto',
  default:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
})

export const typography = {
  largeTitle: {
    fontFamily,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
  } satisfies TextStyle,

  title1: {
    fontFamily,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
  } satisfies TextStyle,

  title2: {
    fontFamily,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  } satisfies TextStyle,

  title3: {
    fontFamily,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
  } satisfies TextStyle,

  heading: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  } satisfies TextStyle,

  body: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } satisfies TextStyle,

  bodyMedium: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  } satisfies TextStyle,

  callout: {
    fontFamily,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  } satisfies TextStyle,

  subhead: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } satisfies TextStyle,

  footnote: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  } satisfies TextStyle,

  caption: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  } satisfies TextStyle,
}
