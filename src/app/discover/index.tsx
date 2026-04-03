import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useMemo, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

import DeckContainer, { DeckContainerRef } from '@/components/deck/DeckContainer';
import SwipeActions from '@/components/swipe-actions/SwipeActions';
import { useDiscoverMovies } from '@/hooks/useTMDB';
import { useAppStore } from '@/store/useAppStore';
import type { Movie } from '@/types';

import { styles } from './index.styles';

export default function DiscoverScreen() {
  const deckRef = useRef<DeckContainerRef>(null);
  const watchlistMovieIds = useAppStore((state) => state.watchlistMovieIds);
  const dislikedMovieIds = useAppStore((state) => state.dislikedMovieIds);
  const swipedMovieIds = useMemo(
    () => [...watchlistMovieIds, ...Object.keys(dislikedMovieIds).map(Number)],
    [watchlistMovieIds, dislikedMovieIds],
  );
  const { movies, isLoading, error, onMovieConsumed } = useDiscoverMovies({
    excludedMovieIds: swipedMovieIds,
  });
  const likeMovie = useAppStore((state) => state.likeMovie);
  const dislikeMovie = useAppStore((state) => state.dislikeMovie);

  const handleLike = (movie: Movie) => {
    likeMovie(movie);
  };

  const handleDislike = (movie: Movie) => {
    dislikeMovie(movie.id);
  };

  const handleInfo = () => {
    // TODO: naviguer vers la fiche du film
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
      <SafeAreaView style={styles.screen}>
        <DeckContainer
          ref={deckRef}
          movies={movies}
          onLike={handleLike}
          onDislike={handleDislike}
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

