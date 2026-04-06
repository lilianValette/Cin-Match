import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 100,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 8,
  },
  logo: {
    color: '#ff8e80',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  subtitle: {
    color: '#B0B4BA',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#131313',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#262626',
  },
  chipSelected: {
    backgroundColor: '#2a1410',
    borderColor: '#ff8e80',
  },
  chipEmoji: {
    fontSize: 20,
  },
  chipText: {
    color: '#B0B4BA',
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: '#ff8e80',
  },
  footer: {
    paddingBottom: 28,
    paddingTop: 8,
    gap: 10,
  },
  counter: {
    color: '#B0B4BA',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff8e80',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#2a2a2a',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  buttonTextDisabled: {
    color: '#555',
  },
});
