import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useMemo, useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';

import DeckContainer, { DeckContainerRef } from '@/components/deck/DeckContainer';
import SwipeActions from '@/components/swipe-actions/SwipeActions';
import { useDiscoverMovies } from '@/hooks/useTMDB';
import { useAppStore } from '@/store/useAppStore';

import { styles } from './index.styles';

export default function DiscoverScreen() {
  const router = useRouter();
  const deckRef = useRef<DeckContainerRef>(null);

  const watchlistMovieIds = useAppStore((state) => state.watchlistMovieIds);
  const dislikedMovieIds = useAppStore((state) => state.dislikedMovieIds);
  const likeMovie = useAppStore((state) => state.likeMovie);
  const dislikeMovie = useAppStore((state) => state.dislikeMovie);
  const setPreviewMovie = useAppStore((state) => state.setPreviewMovie);

  const swipedMovieIds = useMemo(
    () => [...watchlistMovieIds, ...Object.keys(dislikedMovieIds).map(Number)],
    [watchlistMovieIds, dislikedMovieIds],
  );

  const { movies, isLoading, error, onMovieConsumed } = useDiscoverMovies({
    excludedMovieIds: swipedMovieIds,
  });

  const handleInfo = () => {
    const movie = deckRef.current?.getCurrentMovie();
    if (!movie) return;
    setPreviewMovie(movie);
    router.push(`/movie/${movie.id}`);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (movies.length === 0 && isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff8e80" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Stack.Screen options={{ title: 'Découverte — CinéMatch' }} />
      <SafeAreaView style={styles.screen}>
        <DeckContainer
          ref={deckRef}
          movies={movies}
          onLike={likeMovie}
          onDislike={(movie) => dislikeMovie(movie.id)}
          onMovieConsumed={onMovieConsumed}
        />
        <SwipeActions
          onLike={() => deckRef.current?.swipeLike()}
          onDislike={() => deckRef.current?.swipeDislike()}
          onInfo={handleInfo}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
