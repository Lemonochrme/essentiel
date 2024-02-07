import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AchievementCard from './AchievementCard';
import CalculateStatistics from '../utils/CalculateStatistics';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [workoutData, setWorkoutData] = useState(null);

  CalculateStatistics(workoutData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileDataJson = await AsyncStorage.getItem('profileData');
        const workoutDataJson = await AsyncStorage.getItem('workoutData');

        if (profileDataJson && workoutDataJson) {
          setProfileData(JSON.parse(profileDataJson));
          setWorkoutData(JSON.parse(workoutDataJson));
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData(); // Fetch initially

    const intervalId = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome5Icon name="user-circle" size={100} color="white" />
          {profileData && <Text style={styles.label}>{profileData.name}</Text>}
        </View>

        <Text style={styles.label}>My statistics</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="chart-line" size={42} color="white" />
            <Text style={styles.statLabel}>{workoutData?.completed}</Text>
            <Text style={styles.subLabel}>Workouts completed</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="fire-alt" size={42} color="white" />
            <Text style={styles.statLabel}>{workoutData?.days}</Text>
            <Text style={styles.subLabel}>Days of workouts</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="clock" size={42} color="white" />
            <Text style={styles.statLabel}>{workoutData?.duration}</Text>
            <Text style={styles.subLabel}>Total duration (min)</Text>
          </View>
        </View>

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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
};
