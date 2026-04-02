import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    backgroundColor: '#1c1c1c',
  },
  buttonSmall: {
    width: 72,
    height: 72,
  },
  buttonInfo: {
    width: 56,
    height: 56,
    backgroundColor: '#fdc003',
  },
  buttonLarge: {
    width: 72,
    height: 72,
  },
  buttonLike: {
    backgroundColor: '#ff8e80',
  },
  icon: {
    fontSize: 28,
    color: '#ffffff',
  },
  iconInfo: {
    fontSize: 18,
    color: '#000000',
  },
  iconLike: {
    fontSize: 28,
    color: '#ffffff',
  },
});
