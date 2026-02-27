export interface LocationSearchResult {
  address: string
  latitude: number
  longitude: number
}

export interface LocationSearchProps {
  onLocationSelect: (location: LocationSearchResult) => void
  placeholder?: string
}
