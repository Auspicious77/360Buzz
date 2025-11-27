import { Tabs } from 'expo-router';
import { Image, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../../src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';

// Custom Tab Button Component with animation
function TabBarButton({ children, onPress, accessibilityState }: any) {
  const focused = accessibilityState?.selected || false;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.1 : 1,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
  }, [focused]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.1 : 1,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
      style={styles.tabButton}
    >
      <Animated.View style={[styles.tabContent, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          backgroundColor: '#FFFFFF',
          height: Platform.select({
            ios: 70 + insets.bottom,
            android: 80,
          }),
          paddingBottom: Platform.select({
            ios: insets.bottom,
            android: 10,
          }),
          paddingTop: 10,
          paddingHorizontal: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'DMSans-SemiBold',
          marginTop: 4,
          textAlign: 'center',
          alignSelf: 'center'
        },
        tabBarItemStyle: {
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Dashboard.png')}
              style={[styles.icon, { tintColor: focused ? Colors.primary : '#999999' }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="interviews"
        options={{
          title: 'Interviews',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Interviews.png')}
              style={[styles.icon, { tintColor: focused ? '#FF6B00' : '#999999' }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="posted-jobs"
        options={{
          title: 'Posted Jobs',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Jobs.png')}
              style={[styles.icon, { tintColor: focused ? '#FF6B00' : '#999999' }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: 'Team',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Team.png')}
              style={[styles.icon, { tintColor: focused ? '#FF6B00' : '#999999' }]}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});