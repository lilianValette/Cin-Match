import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import { useAppStore } from '@/store/useAppStore';
import type { Movie } from '@/types';

import { styles } from './matches.styles';

export default function MatchesScreen() {
  const router = useRouter();
  const watchlistMovieIds = useAppStore((state) => state.watchlistMovieIds);
  const watchlistById = useAppStore((state) => state.watchlistById);
  const removeFromWatchlist = useAppStore((state) => state.removeFromWatchlist);
  const clearWatchlist = useAppStore((state) => state.clearWatchlist);

  const watchlist = useMemo(
    () =>
      watchlistMovieIds
        .map((id) => watchlistById[id])
        .filter((movie): movie is Movie => Boolean(movie)),
    [watchlistMovieIds, watchlistById],
  );

  const handleRemove = (movieId: number) => {
    removeFromWatchlist(movieId);
  };

  if (watchlist.length === 0) {
    return (
      <SafeAreaView style={[styles.screen, styles.emptyScreen]}>
        <Text style={styles.emptyTitle}>Votre watchlist est vide</Text>
        <Text style={styles.emptyText}>Likez des films dans Découverte pour les retrouver ici.</Text>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Watchlist</Text>
          <Pressable onPress={clearWatchlist} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Vider</Text>
          </Pressable>
        </View>

        <FlatList
          data={watchlist}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.swipeContainer}>
              <Swipeable
                friction={1.7}
                overshootRight={false}
                rightThreshold={90}
                onSwipeableRightOpen={() => handleRemove(item.id)}
                renderRightActions={() => (
                  <View style={styles.swipeDeleteAction}>
                    <Ionicons name="trash-outline" size={22} color="#ff8e80" />
                  </View>
                )}>
                <Pressable
                  onPress={() => router.push(`/movie/${item.id}`)}
                  style={styles.card}
                  accessibilityRole="button"
                  accessibilityLabel={`Ouvrir la fiche de ${item.title.replace(/\n/g, ' ')}`}>
                  <Image source={{ uri: item.posterUrl }} style={styles.poster} contentFit="cover" />
                  <View style={styles.cardContent}>
                    <Text style={styles.movieTitle} numberOfLines={2}>
                      {item.title.replace(/\n/g, ' ')}
                    </Text>
                    <Text style={styles.movieMeta}>
                      {item.year} • {item.rating.toFixed(1)} IMDB
                    </Text>
                    <Text style={styles.overview} numberOfLines={3}>
                      {item.overview}
                    </Text>
                    <Pressable
                      onPress={(event) => {
                        event.stopPropagation();
                        handleRemove(item.id);
                      }}
                      style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>Retirer</Text>
                    </Pressable>
                  </View>
                </Pressable>
              </Swipeable>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

