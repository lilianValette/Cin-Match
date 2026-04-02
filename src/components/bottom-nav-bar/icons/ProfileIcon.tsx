import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IconProps {
  active: boolean;
}

export default function ProfileIcon({ active }: IconProps) {
  return (
    <Text style={[styles.icon, active && styles.iconActive]}>◯</Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    color: '#5a5a6a',
  },
  iconActive: {
    color: '#ff8e80',
  },
});
