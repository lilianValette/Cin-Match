import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { resetDiscoverCache } from '@/hooks/useTMDB';
import { fetchAllGenres } from '@/services/tmdbService';
import { useAppStore } from '@/store/useAppStore';
import type { Genre } from '@/types';

import { styles } from './OnboardingScreen.styles';

const GENRE_EMOJIS: Record<number, string> = {
  28: '⚔️',
  12: '🗺️',
  16: '🎨',
  35: '😂',
  80: '🔫',
  99: '🎬',
  18: '🎭',
  10751: '👨‍👩‍👧',
  14: '🧙',
  36: '📜',
  27: '👻',
  10402: '🎵',
  9648: '🔍',
  10749: '❤️',
  878: '🚀',
  10770: '📺',
  53: '😱',
  10752: '💣',
  37: '🤠',
};

export default function OnboardingScreen() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  useEffect(() => {
    fetchAllGenres()
      .then(setGenres)
      .finally(() => setLoading(false));
  }, []);

  const toggleGenre = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    completeOnboarding([...selected]);
    resetDiscoverCache();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.logo}>CinéMatch</Text>
          <Text style={styles.title}>Quels genres{'\n'}t'attirent ?</Text>
          <Text style={styles.subtitle}>
            Sélectionne tes genres préférés pour personnaliser tes recommandations.
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
            {genres.map((genre) => {
              const isSelected = selected.has(genre.id);
              return (
                <Pressable
                  key={genre.id}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleGenre(genre.id)}
                >
                  <Text style={styles.chipEmoji}>
                    {GENRE_EMOJIS[genre.id] ?? '🎬'}
                  </Text>
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {genre.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.footer}>
          {selected.size > 0 && (
            <Text style={styles.counter}>
              {selected.size} genre{selected.size > 1 ? 's' : ''} sélectionné{selected.size > 1 ? 's' : ''}
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
