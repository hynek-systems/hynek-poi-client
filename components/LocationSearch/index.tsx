import { colors, radius, shadows, spacing, typography } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { LocationSearchProps, LocationSearchResult } from './types'

export function LocationSearch({ onLocationSelect, placeholder }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<LocationSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const performSearch = async (query: string) => {
    if (query.trim().length < 3) {
      setResults([])
      setShowResults(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      // Use Nominatim (OpenStreetMap) for better geocoding
      const encodedQuery = encodeURIComponent(query)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'ExpoPoiClient/1.0',
          },
        },
      )

      if (!response.ok) {
        throw new Error('Geocoding request failed')
      }

      const data = await response.json()

      if (!data || data.length === 0) {
        setResults([])
        setShowResults(false)
        setIsLoading(false)
        return
      }

      const searchResults: LocationSearchResult[] = data.map((item: any) => ({
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }))

      setResults(searchResults)
      setShowResults(searchResults.length > 0)
    } catch (error) {
      console.error('Geocoding error:', error)
      setResults([])
      setShowResults(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (query.trim().length < 3) {
      setResults([])
      setShowResults(false)
      setIsLoading(false)
      return
    }

    // Set loading state immediately
    setIsLoading(true)

    // Debounce the search
    debounceTimer.current = setTimeout(() => {
      performSearch(query)
    }, 500)
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const handleSelectLocation = (location: LocationSearchResult) => {
    onLocationSelect(location)
    setSearchQuery(location.address)
    setShowResults(false)
    Keyboard.dismiss()
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setResults([])
    setShowResults(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Search location...'}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
        {isLoading && <ActivityIndicator size="small" color={colors.primary} />}
        {searchQuery.length > 0 && !isLoading && (
          <Pressable onPress={handleClearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {showResults && results.length > 0 && (
        <View style={styles.resultsContainer}>
          {results.map((result, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.resultItem,
                pressed && styles.resultItemPressed,
              ]}
              onPress={() => handleSelectLocation(result)}
            >
              <Ionicons
                name="location"
                size={20}
                color={colors.primary}
                style={styles.resultIcon}
              />
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultAddress}>{result.address}</Text>
                <Text style={styles.resultCoordinates}>
                  {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  clearButton: {
    marginLeft: spacing.sm,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 300,
    ...shadows.sm,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultItemPressed: {
    backgroundColor: colors.backgroundSecondary,
  },
  resultIcon: {
    marginRight: spacing.md,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultAddress: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  resultCoordinates: {
    ...typography.caption,
    color: colors.textSecondary,
  },
})
