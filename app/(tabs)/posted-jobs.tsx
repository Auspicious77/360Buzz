import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Heading2, BodyText } from '../../src/components';

export default function PostedJobsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Buzzlogo2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Heading2 color="#FFFFFF" style={styles.headerTitle}>Posted Jobs</Heading2>
      </View>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          {/* <Text style={styles.emptyIcon}>📋</Text> */}
          <Heading2 color="#333333" style={styles.emptyTitle}>No Posted Jobs Yet</Heading2>
          <BodyText color="#999999" align="center" style={styles.emptyText}>
            Your posted jobs will appear here
          </BodyText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 30,
    marginBottom: 8,
  },
  headerTitle: {
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    lineHeight: 24,
  },
});
