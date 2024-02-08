import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AchievementCard from './AchievementCard';

const ProfileScreen = () => {
  const [statistics, setStatistics] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedStatistics = await AsyncStorage.getItem('statisticsData');
        const storedProfile = await AsyncStorage.getItem('profileData');
        if (storedStatistics) {
          setStatistics(JSON.parse(storedStatistics));
          console.log('Stored statistics:', JSON.parse(storedStatistics));
        }
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);    

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>My statistics</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="chart-line" size={42} color="white" />
            <Text style={styles.statLabel}>{statistics ? statistics.totalWorkouts : ''}</Text>
            <Text style={styles.subLabel}>Workouts completed</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="fire-alt" size={42} color="white" />
            <Text style={styles.statLabel}>0 days</Text>
            <Text style={styles.subLabel}>Maximum Streak</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="clock" size={42} color="white" />
            <Text style={styles.statLabel}>{statistics ? statistics.averageDurationThisWeek : ''} min</Text>
            <Text style={styles.subLabel}>In average per week</Text>
          </View>
        </View>


        <View style={{ height: 2, width: '100%', backgroundColor: '#282828', borderRadius: 10, marginVertical: 16 }} />
        <Text style={styles.label}>Achievements</Text>

        <AchievementCard
          title="Achievement Title"
          subtitle="Achievement Subtitle"
          currentProgress={3}
          totalProgress={6}
        />

        <AchievementCard
          title="Achievement Title"
          subtitle="Achievement Subtitle"
          currentProgress={3}
          totalProgress={6}
        />

        <AchievementCard
          title="Achievement Title"
          subtitle="Achievement Subtitle"
          currentProgress={3}
          totalProgress={6}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = {
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#161616',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
    width: 100,
  },
  statLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subLabel: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
