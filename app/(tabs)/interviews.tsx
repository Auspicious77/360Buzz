import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, ButtonText, Header, SmallText } from '../../src/components';
import { Colors } from '@/constants';

interface Interview {
  id: string;
  name: string;
  role: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
  avatar: string;
  actionButton: 'join' | 'checkin';
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    name: 'Sandra Doe',
    role: 'Social Media Manager',
    date: 'May 15, 2025',
    time: '10:00 AM',
    status: 'confirmed',
    avatar: 'S',
    actionButton: 'join',
  },
  {
    id: '2',
    name: 'Michael Leye',
    role: 'Social Media Manager',
    date: 'May 16, 2025',
    time: '11:30 AM',
    status: 'confirmed',
    avatar: 'M',
    actionButton: 'checkin',
  },
  {
    id: '3',
    name: 'Atawodi John',
    role: 'Social Media Manager',
    date: 'May 15, 2025',
    time: '10:00 AM',
    status: 'confirmed',
    avatar: 'A',
    actionButton: 'join',
  },
];

export default function InterviewsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Interviews" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {mockInterviews.map((interview) => (
            <View key={interview.id} style={styles.interviewCard}>
              {/* Interview Header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../../assets/Image.png')}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.interviewInfo}>
                  <Text style={styles.interviewName}>{interview.name}</Text>
                  <SmallText color="#666666">{interview.role}</SmallText>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Confirmed</Text>
                </View>
              </View>

              {/* Date & Time */}
              <View style={styles.dateTimeContainer}>
                <Ionicons name="calendar-outline" size={16} color="#666666" style={styles.calendarIcon} />
                <SmallText color="#666666" style={styles.dateTimeText}>
                  Date: {interview.date}, {interview.time}
                </SmallText>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>

                <View style={{ flexDirection: 'row', flex: 1, gap: 8 }}>
                  <Button
                    onPress={() => { }}
                    variant='primary'
                    size='small'
                    title={interview.actionButton === 'join' ? 'Join Interview' : 'Check In'}
                  />
                  <Button
                    onPress={() => { }}
                    variant='secondary'
                    size='small'
                    title={'Reschedule'}
                  />
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={20} color="#666666" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  interviewCard: {

    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
    borderColor: '#DEE1E6',
    borderWidth: 1,

  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  interviewInfo: {
    flex: 1,
  },
  interviewName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
    fontFamily: 'DMSans-Bold',
  },
  statusBadge: {
    backgroundColor: '#FFE1CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateTimeText: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'DMSans-Bold',
  },
  secondaryButton: {
    flex: 1,

    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
  },
  deleteButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
