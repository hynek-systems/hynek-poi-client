import { useQuery } from '@tanstack/react-query'
import * as Location from 'expo-location'
import { USE_LOCATION_KEY } from './keys'

async function fetchLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    throw new Error('Permission denied')
  }

  const result = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  })

  return result.coords
}

export const useLocation = () => {
  return useQuery({
    queryKey: [USE_LOCATION_KEY],
    queryFn: fetchLocation,
  })
}
