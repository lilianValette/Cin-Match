import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { resetDiscoverCache } from '@/hooks/useTMDB';
import { fetchWatchProviders } from '@/services/tmdbService';
import { useAppStore } from '@/store/useAppStore';
import type { StreamingPlatform } from '@/types';

import { styles } from './PlatformSelectionScreen.styles';

export default function PlatformSelectionScreen() {
  const [providers, setProviders] = useState<StreamingPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const completePlatformSelection = useAppStore((state) => state.completePlatformSelection);
  const currentPlatformIds = useAppStore((state) => state.selectedPlatformIds);
  const [selected, setSelected] = useState<Set<number>>(() => new Set(currentPlatformIds));

  useEffect(() => {
    fetchWatchProviders()
      .then(setProviders)
      .finally(() => setLoading(false));
  }, []);

  const toggleProvider = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePeuImporte = () => {
    completePlatformSelection([]);
    resetDiscoverCache();
  };

  const handleContinue = () => {
    completePlatformSelection([...selected]);
    resetDiscoverCache();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>CinéMatch</Text>
          <Text style={styles.title}>Où regardes-tu{'\n'}tes films ?</Text>
          <Text style={styles.subtitle}>
            Sélectionne tes plateformes pour ne voir que les films disponibles chez toi.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ff8e80" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {providers.map((provider) => {
              const isSelected = selected.has(provider.id);
              return (
                <Pressable
                  key={provider.id}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleProvider(provider.id)}
                >
                  {provider.logoUrl ? (
                    <Image
                      source={{ uri: provider.logoUrl }}
                      style={styles.logo_img}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.logoPlaceholder} />
                  )}
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {provider.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.footer}>
          <Pressable style={styles.buttonPeuImporte} onPress={handlePeuImporte}>
            <Text style={styles.buttonPeuImporteText}>Peu importe</Text>
            <Text style={styles.buttonPeuImporteSubtext}>Voir tous les films disponibles</Text>
          </Pressable>

          {selected.size > 0 && (
            <Text style={styles.counter}>
              {selected.size} plateforme{selected.size > 1 ? 's' : ''} sélectionnée{selected.size > 1 ? 's' : ''}
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
