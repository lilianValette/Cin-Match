import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#131313',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    // Simulated gradient via multiple overlapping views
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    backgroundColor: 'rgba(40, 40, 40, 0.85)',
  },
  chipPremium: {
    backgroundColor: '#fdc003',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  chipTextPremium: {
    color: '#131313',
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 42,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 16,
    color: '#fdc003',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
