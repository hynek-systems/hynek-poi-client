import { mergeStyles } from '@/libs/utils'
import { colors, radius, shadows, spacing, typography } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { CardContentProps, CardHeaderProps, CardProps, CardTitleProps } from './types'

export function Card(props: CardProps) {
  const style = mergeStyles(props.style, {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.sm,
  })

  return <View style={style}>{props.children}</View>
}

export function CardHeader(props: CardHeaderProps) {
  return (
    <View
      style={{
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      {props.children}
    </View>
  )
}

export function CardTitle({ title, icon, size, color }: CardTitleProps) {
  return (
    <View
      style={{
        ...typography.heading,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
      }}
    >
      {icon && <Ionicons name={icon} size={size || 16} color={color || colors.text} />}
      <Text style={typography.heading}>{title}</Text>
    </View>
  )
}

export function CardContent(props: CardContentProps) {
  return <View style={{ padding: spacing.lg }}>{props.children}</View>
}
