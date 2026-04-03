import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import type { Movie } from '@/types';

import { styles } from './DeckContainer.styles';
import SwipeCard, { SwipeCardRef } from './SwipeCard';

interface DeckContainerProps {
  movies: Movie[];
  onLike: (movie: Movie) => void;
  onDislike: (movie: Movie) => void;
  onMovieConsumed?: (remainingCount: number) => void;
}

export interface DeckContainerRef {
  swipeLike: () => void;
  swipeDislike: () => void;
}

const DeckContainer = forwardRef<DeckContainerRef, DeckContainerProps>(
  ({ movies, onLike, onDislike, onMovieConsumed }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef<SwipeCardRef>(null);

    const currentMovie = movies[currentIndex];
    const hasMore = currentIndex < movies.length;

    const advance = (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      onMovieConsumed?.(movies.length - nextIndex);
    };

    const handleLike = () => {
      if (!currentMovie) return;
      onLike(currentMovie);
      advance(currentIndex + 1);
    };

    const handleDislike = () => {
      if (!currentMovie) return;
      onDislike(currentMovie);
      advance(currentIndex + 1);
    };

    useImperativeHandle(ref, () => ({
      swipeLike: () => cardRef.current?.triggerLike(),
      swipeDislike: () => cardRef.current?.triggerDislike(),
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
        ref={cardRef}
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
