import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Loader } from './Loader';
import { Colors, Spacing, FontSizes, FontWeights } from '../constants';

interface LoadingStateProps {
  message?: string;
  size?: number;
  color?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 50,
  color = Colors.primary,
}) => {
  return (
    <View style={styles.container}>
      <Loader size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  message: {
    marginTop: Spacing.lg,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    fontWeight: FontWeights.medium,
  },
});
