import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import DeckContainer, { DeckContainerRef } from '@/components/deck/DeckContainer';
import SwipeActions from '@/components/swipe-actions/SwipeActions';
import { useDiscoverMovies } from '@/hooks/useTMDB';
import type { Movie } from '@/types';

export default function DiscoverScreen() {
  const deckRef = useRef<DeckContainerRef>(null);
  const { movies, isLoading, error, onMovieConsumed } = useDiscoverMovies();

  const handleLike = (movie: Movie) => {
    // TODO: enregistrer le like dans le store
    console.log('liked:', movie.title);
  };

  const handleDislike = (movie: Movie) => {
    // TODO: enregistrer le dislike dans le store
    console.log('disliked:', movie.title);
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff8e80',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
