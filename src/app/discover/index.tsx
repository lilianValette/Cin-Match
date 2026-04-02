import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import DeckContainer, { DeckContainerRef } from '@/components/deck/DeckContainer';
import SwipeActions from '@/components/swipe-actions/SwipeActions';
import { MOCK_MOVIES } from '@/data/mockMovies';
import type { Movie } from '@/types';

export default function DiscoverScreen() {
  const deckRef = useRef<DeckContainerRef>(null);

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

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.screen}>
        <DeckContainer
          ref={deckRef}
          movies={MOCK_MOVIES}
          onLike={handleLike}
          onDislike={handleDislike}
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
});
