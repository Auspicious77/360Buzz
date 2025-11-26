import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { Colors } from '../../src/constants';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          backgroundColor: '#FFFFFF',
          height: 75,
          paddingBottom: 10,
          paddingTop: 5,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          fontFamily: 'DMSans-SemiBold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/Dashboard.png')}
              
              style={[styles.icon, { tintColor: focused ? '#FF6B00' : '#999999' }]}
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
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
