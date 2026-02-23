import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { MapMarker } from './types'

type Props = {
  markers?: MapMarker[]
  latitude: number
  longitude: number
}

export default function Map({ markers = [], latitude, longitude }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (!isLoaded) return <div>Loading map...</div>

  return (
    <GoogleMap
      zoom={13}
      center={{ lat: latitude, lng: longitude }}
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  )
}
