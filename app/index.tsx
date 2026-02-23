import Map from '@/components/Map'
import { useLocation } from '@/queries/use-location'
import { View } from 'react-native'

export default function Index() {
  const { data } = useLocation()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Map latitude={data?.latitude || 0} longitude={data?.longitude || 0} />
    </View>
  )
}
