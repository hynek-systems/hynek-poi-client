import { spacing, typography } from '@/theme'
import type { Meta, StoryObj } from '@storybook/react-native'
import { Text, View } from 'react-native'
import { Card, CardContent, CardHeader, CardTitle } from './index'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: spacing.xl,
        }}
      >
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle title="Card title" />
      </CardHeader>

      <CardContent>
        <Text style={typography.body}>
          This is the card content. You can place anything here.
        </Text>
      </CardContent>
    </Card>
  ),
}

export const WithoutHeader: Story = {
  render: () => (
    <Card>
      <CardContent>
        <Text style={typography.body}>Card without header.</Text>
      </CardContent>
    </Card>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle title="POI example" />
      </CardHeader>

      <CardContent>
        <Text style={typography.body}>Restaurant name: Sushi Place</Text>
        <Text style={typography.body}>Rating: ★★★★☆</Text>
        <Text style={typography.body}>Distance: 450m</Text>
      </CardContent>
    </Card>
  ),
}
