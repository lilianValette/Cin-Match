import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#5a5a6a',
  },
  labelActive: {
    color: '#ff8e80',
  },
  icon: {
    fontSize: 20,
    color: '#5a5a6a',
  },
  iconActive: {
    color: '#ff8e80',
  },
});
