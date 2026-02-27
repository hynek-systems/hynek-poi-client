import { Ionicons } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type IonIconsProps = ComponentProps<typeof Ionicons>

export type CardProps = {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export type CardHeaderProps = {
  children?: React.ReactNode
}

export type CardTitleProps = {
  title?: string
  icon?: IonIconsProps['name']
  size?: IonIconsProps['size']
  color?: IonIconsProps['color']
}

export type CardContentProps = {
  children?: React.ReactNode
}
