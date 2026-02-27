import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { CategoryFilter } from '@/components/CategoryFilter'
import { LocationSearch } from '@/components/LocationSearch'
import { LocationSearchResult } from '@/components/LocationSearch/types'
import Map from '@/components/Map'
import { useLocation } from '@/queries/use-location'
import { usePoisNearby } from '@/queries/use-pois-nearby'
import { colors, spacing, typography } from '@/theme'
import { CATEGORIES } from '@/types'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { POI } from '@hyneksystems/poi-sdk-js'
import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Index() {
  const { data: locationData } = useLocation()
  const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(
    null,
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Use selected location if available, otherwise use current location
  const displayLatitude = selectedLocation?.latitude || locationData?.latitude || 0
  const displayLongitude = selectedLocation?.longitude || locationData?.longitude || 0

  const {
    data: poisData,
    isLoading,
    error,
  } = usePoisNearby(displayLatitude, displayLongitude)
  const snapPoints = useMemo(() => ['15%', '50%', '90%'], [])
  console.log('POIs data:', poisData?.data)

  // Filter POIs based on selected categories
  const filteredPois = useMemo(() => {
    if (!poisData?.data) return []
    if (selectedCategories.length === 0) return poisData.data
    return poisData.data.filter((poi) => selectedCategories.includes(poi.category))
  }, [poisData?.data, selectedCategories])

  const handleLocationSelect = (location: LocationSearchResult) => {
    setSelectedLocation(location)
  }

  const renderItem = useCallback(({ item, index }: { item: POI; index: number }) => {
    return (
      <Card style={{ marginBlock: spacing.sm }} key={item.id}>
        <CardHeader>
          <CardTitle
            title={item.name}
            icon={CATEGORIES.find((cat) => cat.id === item.category)?.icon}
          />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    )
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* Map */}
      <View style={{ flex: 1, width: '100%' }}>
        <Map
          latitude={displayLatitude}
          longitude={displayLongitude}
          markers={filteredPois.map((poi) => ({
            id: poi.id.toString(),
            latitude: poi.latitude,
            longitude: poi.longitude,
            title: poi.name,
          }))}
        />

        {/* Location Search */}
        <View
          style={{
            position: 'absolute',
            top: spacing['6xl'],
            left: spacing.md,
            right: spacing.md,
          }}
        >
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </View>

        {/* BOTTOM SHEET */}
        <BottomSheet snapPoints={snapPoints} index={0} enablePanDownToClose={false}>
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
          />
          <BottomSheetScrollView contentContainerStyle={{ padding: spacing.md }}>
            {isLoading && (
              <View style={styles.centerContent}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.statusText}>Loading POIs...</Text>
              </View>
            )}
            {error && (
              <View style={styles.centerContent}>
                <Text style={styles.errorText}>⚠️ Error loading POIs</Text>
                <Text style={styles.errorDetails}>
                  {error instanceof Error ? error.message : 'Unknown error'}
                </Text>
                <Text style={styles.errorHint}>
                  Make sure the API server is running and accessible
                </Text>
              </View>
            )}
            {!isLoading && !error && filteredPois.length === 0 && (
              <View style={styles.centerContent}>
                <Text style={styles.statusText}>No POIs found</Text>
              </View>
            )}
            {!isLoading &&
              !error &&
              filteredPois.map((item, index) => renderItem({ item, index }))}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.sm,
  },
  statusText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    ...typography.bodyMedium,
    color: colors.danger,
    textAlign: 'center',
  },
  errorDetails: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorHint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})
