import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Movie } from '@/types';
import SwipeCard from './SwipeCard';

interface DeckContainerProps {
  movies: Movie[];
  onLike: (movie: Movie) => void;
  onDislike: (movie: Movie) => void;
}

/** Méthodes exposées aux parents via ref (utilisées par SwipeActions) */
export interface DeckContainerRef {
  swipeLike: () => void;
  swipeDislike: () => void;
}

const DeckContainer = forwardRef<DeckContainerRef, DeckContainerProps>(
  ({ movies, onLike, onDislike }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentMovie = movies[currentIndex];
    const hasMore = currentIndex < movies.length;

    const handleLike = () => {
      if (!currentMovie) return;
      onLike(currentMovie);
      setCurrentIndex((prev) => prev + 1);
    };

    const handleDislike = () => {
      if (!currentMovie) return;
      onDislike(currentMovie);
      setCurrentIndex((prev) => prev + 1);
    };

    useImperativeHandle(ref, () => ({
      swipeLike: handleLike,
      swipeDislike: handleDislike,
    }));

    if (!hasMore || !currentMovie) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Plus de films à découvrir</Text>
          <Text style={styles.emptySubtext}>Revenez bientôt !</Text>
        </View>
      );
    }

    return (
      <SwipeCard
        key={currentMovie.id}
        movie={currentMovie}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    );
  },
);

DeckContainer.displayName = 'DeckContainer';

export default DeckContainer;

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtext: {
    color: '#B0B4BA',
    fontSize: 14,
  },
});
