import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: '#262626',
  },
  title: {
    color: '#B0B4BA',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },
});
