import React, { ReactNode } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../constants';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padding?: boolean;
  backgroundColor?: string;
  safeArea?: boolean;
  keyboardAvoiding?: boolean;
  style?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = false,
  padding = true,
  backgroundColor = Colors.background,
  safeArea = true,
  keyboardAvoiding = true,
  style,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    ...(padding && { padding: Spacing.md }),
    ...style,
  };

  const content = scroll ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={containerStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={containerStyle}>{children}</View>
  );

  const wrappedContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return safeArea ? (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {wrappedContent}
    </SafeAreaView>
  ) : (
    wrappedContent
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
