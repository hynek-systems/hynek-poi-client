import { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { MapMarker } from './types'

type Props = {
  markers?: MapMarker[]
  latitude: number
  longitude: number
}

export default function Map({ markers = [], latitude, longitude }: Props) {
  const mapRef = useRef<MapView>(null)

  // Animate to new coordinates when they change
  useEffect(() => {
    if (latitude && longitude && mapRef.current) {
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
      mapRef.current.animateToRegion(region, 1000)
    }
  }, [latitude, longitude])

  if (!latitude || !longitude) {
    return null
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
      showsMyLocationButton
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
        />
      ))}
    </MapView>
  )
}
