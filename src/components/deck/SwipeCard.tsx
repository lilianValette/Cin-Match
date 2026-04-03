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
import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, Text } from 'react-native';

import MovieCard from '@/components/movie-card/MovieCard';
import type { Movie } from '@/types';

import { styles } from './SwipeCard.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const VELOCITY_THRESHOLD = 800;
const MAX_ROTATION = 15;

interface SwipeCardProps {
  movie: Movie;
  onLike: () => void;
  onDislike: () => void;
}

export interface SwipeCardRef {
  triggerLike: () => void;
  triggerDislike: () => void;
}

const SwipeCard = forwardRef<SwipeCardRef, SwipeCardProps>(function SwipeCard(
  { movie, onLike, onDislike },
  ref,
) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const likeOpacity = useDerivedValue(() =>
    interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  );
  const nopeOpacity = useDerivedValue(() =>
    interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  );

  const animateOut = (direction: 'left' | 'right', callback: () => void) => {
    const target = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    translateX.value = withTiming(target, { duration: 280 }, () => runOnJS(callback)());
  };

  useImperativeHandle(ref, () => ({
    triggerLike: () => animateOut('right', onLike),
    triggerDislike: () => animateOut('left', onDislike),
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
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

  const likeBackdropStyle = useAnimatedStyle(() => ({
    opacity: likeOpacity.value,
    transform: [{ translateX: interpolate(likeOpacity.value, [0, 1], [-24, 0]) }],
  }));
  const nopeBackdropStyle = useAnimatedStyle(() => ({
    opacity: nopeOpacity.value,
    transform: [{ translateX: interpolate(nopeOpacity.value, [0, 1], [24, 0]) }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.container}>
        <Animated.View
          pointerEvents="none"
          style={[styles.backdropIndicator, styles.backdropIndicatorLike, likeBackdropStyle]}
        >
          <Text style={[styles.backdropIndicatorText, styles.backdropIndicatorTextLike]}>OUI</Text>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[styles.backdropIndicator, styles.backdropIndicatorNope, nopeBackdropStyle]}
        >
          <Text style={[styles.backdropIndicatorText, styles.backdropIndicatorTextNope]}>NON</Text>
        </Animated.View>

        <Animated.View style={[styles.cardLayer, cardStyle]}>
          <MovieCard movie={movie} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
});

export default SwipeCard;
