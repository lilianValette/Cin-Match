import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

import type { Movie } from '@/types';
import { styles } from './MovieCard.styles';

interface MovieCardProps {
  movie: Movie;
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating / 2);
  return (
    <View style={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Text key={i} style={styles.star}>
          {i < filled ? '★' : '☆'}
        </Text>
      ))}
    </View>
  );
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: movie.posterUrl }}
        style={styles.image}
        contentFit="cover"
      />

      {/* Bottom gradient overlay */}
      <View style={styles.gradient}>
        <View style={styles.genresRow}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.chip}>
              <Text style={styles.chipText}>{genre.name}</Text>
            </View>
          ))}
          {movie.isPremium && (
            <View style={[styles.chip, styles.chipPremium]}>
              <Text style={[styles.chipText, styles.chipTextPremium]}>Premium</Text>
            </View>
          )}
        </View>

        <View style={styles.ratingRow}>
          <StarRating rating={movie.rating} />
          <Text style={styles.ratingText}>{movie.rating.toFixed(1)} IMDB</Text>
        </View>
      </View>
    </View>
  );
}
