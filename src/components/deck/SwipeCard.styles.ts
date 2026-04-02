import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  cardLayer: {
    flex: 1,
  },
  backdropIndicator: {
    position: 'absolute',
    top: '44%',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  backdropIndicatorLike: {
    left: 24,
    borderColor: '#ff8e80',
    transform: [{ rotate: '-15deg' }],
  },
  backdropIndicatorNope: {
    right: 24,
    borderColor: '#f2f2f2',
    transform: [{ rotate: '15deg' }],
  },
  backdropIndicatorText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  backdropIndicatorTextLike: {
    color: '#ff8e80',
  },
  backdropIndicatorTextNope: {
    color: '#f2f2f2',
  },
});