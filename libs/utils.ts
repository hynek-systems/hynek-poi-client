import { StyleProp } from 'react-native'

export function mergeStyles<T>(
  style: StyleProp<T>,
  ...additionalStyles: StyleProp<T>[]
): StyleProp<T> {
  return [style, ...additionalStyles].filter(Boolean) as StyleProp<T>
}
