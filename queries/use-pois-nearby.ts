import { HynekPOIClient } from '@hyneksystems/poi-sdk-js'
import { useQuery } from '@tanstack/react-query'
import { USE_POIS_NEARBY_KEY } from './keys'

async function fetchPoisNearby(latitude: number, longitude: number) {
  const client = new HynekPOIClient({
    baseUrl: process.env.EXPO_PUBLIC_HYNEK_POI_API_URL,
  })

  return await client.pois.nearby({
    lat: latitude,
    lng: longitude,
  })
}

export const usePoisNearby = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: [USE_POIS_NEARBY_KEY, latitude, longitude],
    queryFn: () => fetchPoisNearby(latitude, longitude),
    enabled: !!latitude && !!longitude,
  })
}
