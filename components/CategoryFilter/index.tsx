import { colors, radius, spacing, typography } from '@/theme'
import { CATEGORIES } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { CategoryFilterProps } from './types'

export function CategoryFilter({
  selectedCategories,
  onCategoriesChange,
}: CategoryFilterProps) {
  const handleToggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      // Remove category
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId))
    } else {
      // Add category
      onCategoriesChange([...selectedCategories, categoryId])
    }
  }

  const handleClearAll = () => {
    onCategoriesChange([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter by Category</Text>
        {selectedCategories.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          return (
            <Pressable
              key={category.id}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipSelected,
                pressed && styles.chipPressed,
              ]}
              onPress={() => handleToggleCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={isSelected ? colors.background : colors.textSecondary}
                style={styles.chipIcon}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {category.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  clearButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  clearButtonText: {
    ...typography.caption,
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipIcon: {
    marginRight: spacing.xs,
  },
  chipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.background,
    fontWeight: '600',
  },
})
