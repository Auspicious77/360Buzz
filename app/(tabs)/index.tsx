import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store';
import { Header, Heading4, SmallText } from '../../src/components';
import { Colors } from '@/constants';

// Mock data for update cards
const UPDATE_DATA = [
  {
    id: '1',
    type: 'job',
    category: 'Job Updates',
    title: 'UX Designer',
    description: 'Finalizing your top candidates for background checks.',
    time: '1 hour ago',
    progress: 70,
    icon: 'checkmark-circle-outline',
    iconColor: Colors.primary,
    canPreview: false
  },
  {
    id: '2',
    type: 'job',
    category: 'Job Updates',
    title: 'Your job "Software Engineer" \nhas been posted',
    description: '',
    time: '2 hours ago',
    progress: null,
    icon: 'checkmark-circle-outline',
    iconColor: '#FF6B00',
    canPreview: true

  },
  {
    id: '3',
    type: 'interview',
    category: 'Interviews',
    title: 'Interview with John D. scheduled',
    description: 'Technical interview for Frontend Developer position',
    time: '3 hours ago',
    progress: null,
       icon: 'checkmark-circle-outline',
    iconColor: Colors.primary,
    canPreview: true

  },
  {
    id: '4',
    type: 'team',
    category: 'Team',
    title: 'New team member added',
    description: 'Sarah Johnson joined your hiring team',
    time: '5 hours ago',
    progress: null,
    icon: 'person-add-outline',
    iconColor: Colors.primary,
    canPreview: true

  },
];

// Tab data
const TABS = [
  { id: 'all', label: 'All' },
  { id: 'job', label: 'Job Updates' },
  { id: 'interview', label: 'Interviews' },
  { id: 'team', label: 'Team' },
];

export default function DashboardScreen() {
  const user = useAuthStore((state:any) => state.user);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  console.log('User in DashboardScreen:', user);

  // Filter and search functionality
  const filteredUpdates = useMemo(() => {
    let filtered = UPDATE_DATA;

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(update => update.type === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(update => 
        update.title.toLowerCase().includes(query) ||
        update.description.toLowerCase().includes(query) ||
        update.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const renderUpdateCard = (item: any) => (
    <View key={item.id} style={styles.updateCard}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.updateIconContainer}>
              <Ionicons name={item.icon} size={20} color={item.iconColor} />
            </View>
            <Text style={styles.updateTitle}>{item.title}</Text>
          </View>

          {item.progress !== null && (
            <TouchableOpacity style={styles.viewProgressButton}>
              <Text style={styles.viewProgressText}>VIEW PROGRESS</Text>
            </TouchableOpacity>
          )}

             {item.canPreview && (
            <TouchableOpacity>
               <Ionicons size={20} name='arrow-forward' color={Colors.primary}/>
            </TouchableOpacity>
          )}
        </View>

        {item.progress !== null && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
          </View>
        )}

        

      

        <View style={styles.updateContent}>
          {item.description ? (
            <SmallText color="#666666" style={styles.updateDescription}>
              {item.description}
            </SmallText>
          ) : null}
          <SmallText color="#999999" style={styles.updateTime}>{item.time}</SmallText>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header dashboard={true} user={user}/>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Interview Alert Card */}
        <View style={styles.interviewCard}>
          <View style={styles.interviewContent}>
            <View style={styles.interviewImageContainer}>
              <Image
                source={require('../../assets/image2.png')}
                style={styles.interviewAvatar}
              />
            </View>
            <View style={styles.interviewDetails}>
              <Heading4 style={styles.interviewTitle}>Interview with Sarah A. in 1 hour</Heading4>
              <SmallText color={Colors.primary} style={{ fontSize: 12 }}>Downtown medical centre</SmallText>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join interview</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paginationDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Recent Updates Section */}
        <View style={styles.recentSection}>
          <Heading4 color="#000000" style={styles.sectionTitle}>Recent Updates</Heading4>

          {/* Filter Tabs - Now horizontally scrollable */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScrollView}
            contentContainerStyle={styles.tabsContentContainer}
          >
            {TABS.map((tab) => (
              <TouchableOpacity 
                key={tab.id}
                style={[
                  styles.tab, 
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => handleTabPress(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Update Cards - Mapped from filtered data */}
          {filteredUpdates.length > 0 ? (
            filteredUpdates.map(renderUpdateCard)
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {searchQuery ? 'No results found for your search' : 'No updates available'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  scrollView: {
    flex: 1,
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsIcon: {
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 15,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'DMSans-Regular',
  },
  interviewCard: {
    backgroundColor: '#FFE5D9',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  interviewContent: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interviewImageContainer: {
    marginRight: 16,
  },
  interviewAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  interviewDetails: {
    flex: 1,
  },
  interviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'DMSans-Bold',
  },
  joinButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#CCCCCC',
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 6,
    height: 6,
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  // Updated styles for horizontal scrollable tabs
  tabsScrollView: {
    marginBottom: 20,
  },
  tabsContentContainer: {
    paddingRight: 20, // Extra padding for better scrolling
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    marginRight: 8, // Use marginRight instead of gap for horizontal scroll
  },
  activeTab: {
    backgroundColor: '#FF6B00',
  },
  tabText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
  },
  activeTabText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'DMSans-SemiBold',
  },
  updateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#DEE1E6',
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  updateIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 15,
    fontWeight: '600',
   
    color: '#000000',
    fontFamily: 'DMSans-SemiBold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B00',
    borderRadius: 3,
  },
  updateDescription: {
    marginBottom: 4,
    fontSize: 11
  },
  updateTime: {
    marginTop: 4,
  },
  viewProgressButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 6,
  },
  viewProgressText: {
    fontSize: 9,
    color: '#FF6B00',
    fontWeight: '700',
    fontFamily: 'DMSans-Bold',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
});