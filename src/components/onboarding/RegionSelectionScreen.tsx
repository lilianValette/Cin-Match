import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { CINEMA_REGIONS } from '@/constants/regions';
import { resetDiscoverCache } from '@/hooks/useTMDB';
import { useAppStore } from '@/store/useAppStore';

import { styles } from './RegionSelectionScreen.styles';

export default function RegionSelectionScreen() {
  const completeRegionSelection = useAppStore((state) => state.completeRegionSelection);
  const currentRegionIds = useAppStore((state) => state.selectedRegionIds);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(currentRegionIds));

  const toggleRegion = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePeuImporte = () => {
    completeRegionSelection([]);
    resetDiscoverCache();
  };

  const handleContinue = () => {
    completeRegionSelection([...selected]);
    resetDiscoverCache();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>CinéMatch</Text>
          <Text style={styles.title}>D'où viennent{'\n'}tes films ?</Text>
          <Text style={styles.subtitle}>
            Sélectionne les cinémas du monde qui t'attirent pour affiner tes suggestions.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {CINEMA_REGIONS.map((region) => {
            const isSelected = selected.has(region.id);
            return (
              <Pressable
                key={region.id}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => toggleRegion(region.id)}
              >
                <Text style={styles.chipEmoji}>{region.emoji}</Text>
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {region.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.buttonPeuImporte} onPress={handlePeuImporte}>
            <Text style={styles.buttonPeuImporteText}>Peu importe</Text>
            <Text style={styles.buttonPeuImporteSubtext}>Films du monde entier</Text>
          </Pressable>

          {selected.size > 0 && (
            <Text style={styles.counter}>
              {selected.size} cinéma{selected.size > 1 ? 's' : ''} sélectionné{selected.size > 1 ? 's' : ''}
            </Text>
          )}
          <Pressable
            style={[styles.button, selected.size === 0 && styles.buttonDisabled]}
            disabled={selected.size === 0}
            onPress={handleContinue}
          >
            <Text style={[styles.buttonText, selected.size === 0 && styles.buttonTextDisabled]}>
              Commencer
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
