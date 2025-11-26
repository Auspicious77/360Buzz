import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Heading2, Heading4, SmallText } from './Typography';

interface HeaderProps {
  title?: string;
  showSettings?: boolean;
  onSettingsPress?: () => void;
  dashboard?: boolean;
  user?: {
    fullName?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showSettings = false,
  onSettingsPress,
  dashboard = false,
  user,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Buzzlogo2.png')}
          style={styles.logo}
          resizeMode="contain"

        />
      </View>
      {title && (
        <Heading2 color="#FFFFFF" style={styles.title}>{title}</Heading2>
      )}
      {showSettings && (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="#666666" />
        </TouchableOpacity>
      )}

      {
        dashboard &&
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/Image.png')}
                style={styles.avatar}
              />
            </View>
            <View style={styles.welcomeTextContainer}>
              <SmallText color="#FFFFFF">Good morning</SmallText>
              <Heading4 color="#FFFFFF">{user?.fullName || 'Alexander Michael'}</Heading4>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={30} color="#666666" />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingTop: 50,
    paddingBottom: 20,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    // position: 'relative',
  },
  logoContainer: {
    marginBottom: 8,
    alignSelf: 'center',
  },
  logo: {
    width: 120,
    height: 30,
  },
  title: {
    marginTop: 4,
    textAlign: 'center',
  },
  settingsButton: {
    // position: 'absolute',
    // right: 20,
    // top: 55,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
  },
});
