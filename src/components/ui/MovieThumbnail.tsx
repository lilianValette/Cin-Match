import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import type { Movie } from '@/types';

import { styles } from './MovieThumbnail.styles';

interface Props {
  movie: Movie;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function MovieThumbnail({ movie, onPress, containerStyle }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, containerStyle]}
      accessibilityRole="button"
      accessibilityLabel={`Ouvrir ${movie.title}`}>
      <Image source={{ uri: movie.posterUrl }} style={styles.poster} contentFit="cover" />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </Pressable>
  );
}
