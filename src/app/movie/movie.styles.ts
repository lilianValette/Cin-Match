import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
    gap: 14,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  backdrop: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#131313',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  meta: {
    color: '#fdc003',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  providersSection: {
    gap: 10,
    marginTop: 4,
  },
  providerModeSwitch: {
    backgroundColor: '#131313',
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    gap: 6,
  },
  modeButton: {
    flex: 1,
    borderRadius: 9,
    paddingVertical: 9,
    alignItems: 'center',
    backgroundColor: '#262626',
  },
  modeButtonActive: {
    backgroundColor: '#ff8e80',
  },
  modeButtonText: {
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  modeButtonTextActive: {
    color: '#131313',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  providersHint: {
    color: '#B0B4BA',
    fontSize: 13,
    lineHeight: 19,
  },
  providersList: {
    gap: 8,
  },
  providerCard: {
    backgroundColor: '#131313',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    rowGap: 4,
    flexWrap: 'wrap',
  },
  providerLogo: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#262626',
  },
  providerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  providerCategories: {
    color: '#fdc003',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#262626',
  },
  chipText: {
    color: '#B0B4BA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  overview: {
    color: '#B0B4BA',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  emptyText: {
    color: '#B0B4BA',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  backButtonText: {
    color: '#ff8e80',
    fontSize: 13,
    fontWeight: '700',
  },
});