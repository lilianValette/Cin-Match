import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 96,
  },
  emptyScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyText: {
    color: '#B0B4BA',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  clearButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  clearButtonText: {
    color: '#fdc003',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  listContent: {
    gap: 12,
    paddingBottom: 20,
  },
  swipeContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#131313',
    borderRadius: 16,
    padding: 10,
  },
  swipeDeleteAction: {
    flex: 1,
    backgroundColor: '#3A0F13',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 18,
  },
  poster: {
    width: 92,
    height: 132,
    borderRadius: 12,
    backgroundColor: '#262626',
  },
  cardContent: {
    flex: 1,
    gap: 6,
    paddingVertical: 2,
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  movieMeta: {
    color: '#fdc003',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  overview: {
    color: '#B0B4BA',
    fontSize: 13,
    lineHeight: 18,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 2,
    backgroundColor: '#262626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  removeButtonText: {
    color: '#ff8e80',
    fontSize: 12,
    fontWeight: '700',
  },
});