import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  /**
   * Simulates a top-to-bottom gradient: rgba(0,0,0,0) → rgba(0,0,0,0.92).
   * Since React Native doesn't have a native gradient without extra packages,
   * we stack two semi-transparent views. expo-linear-gradient can replace
   * this in the future for a smoother result.
   */
  gradientFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  container: {
    flexDirection: 'row',
    paddingBottom: 28,
    paddingHorizontal: 8,
    paddingTop: 12,
  },
});
