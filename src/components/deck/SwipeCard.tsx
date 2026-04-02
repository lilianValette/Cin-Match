import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import MovieCard from '@/components/movie-card/MovieCard';
import type { Movie } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/** Seuil en px au-delà duquel le swipe est validé */
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

/** Vélocité minimale pour valider un swipe rapide */
const VELOCITY_THRESHOLD = 800;

/** Angle de rotation max (en degrés) au bord de l'écran */
const MAX_ROTATION = 15;

interface SwipeCardProps {
  movie: Movie;
  onLike: () => void;
  onDislike: () => void;
}

export default function SwipeCard({ movie, onLike, onDislike }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Opacité des indicateurs LIKE / NOPE (0 → 1 selon la direction du drag)
  const likeOpacity = useDerivedValue(() =>
    interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  );
  const nopeOpacity = useDerivedValue(() =>
    interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  );

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      // Légère élévation verticale pendant le drag
      translateY.value = e.translationY * 0.15;
    })
    .onEnd((e) => {
      const shouldSwipeRight =
        e.translationX > SWIPE_THRESHOLD || e.velocityX > VELOCITY_THRESHOLD;
      const shouldSwipeLeft =
        e.translationX < -SWIPE_THRESHOLD || e.velocityX < -VELOCITY_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 280 }, () =>
          runOnJS(onLike)(),
        );
      } else if (shouldSwipeLeft) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 280 }, () =>
          runOnJS(onDislike)(),
        );
      } else {
        // Snap back au centre
        translateX.value = withSpring(0, { damping: 15, stiffness: 120 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-MAX_ROTATION, 0, MAX_ROTATION],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({ opacity: likeOpacity.value }));
  const nopeStyle = useAnimatedStyle(() => ({ opacity: nopeOpacity.value }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, cardStyle]}>
        <MovieCard movie={movie} />

        {/* Indicateur LIKE */}
        <Animated.View style={[styles.indicator, styles.indicatorLike, likeStyle]}>
          <Text style={[styles.indicatorText, styles.indicatorTextLike]}>LIKE</Text>
        </Animated.View>

        {/* Indicateur NOPE */}
        <Animated.View style={[styles.indicator, styles.indicatorNope, nopeStyle]}>
          <Text style={[styles.indicatorText, styles.indicatorTextNope]}>NOPE</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    top: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 3,
  },
  indicatorLike: {
    left: 24,
    borderColor: '#ff8e80',
    transform: [{ rotate: '-15deg' }],
  },
  indicatorNope: {
    right: 24,
    borderColor: '#ffffff',
    transform: [{ rotate: '15deg' }],
  },
  indicatorText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  indicatorTextLike: {
    color: '#ff8e80',
  },
  indicatorTextNope: {
    color: '#ffffff',
  },
});
