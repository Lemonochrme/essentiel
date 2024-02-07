import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AchievementCard from './AchievementCard';

const ProfileScreen = () => {
  const [statistics, setStatistics] = React.useState(null);

  React.useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const storedStatistics = await AsyncStorage.getItem('statistics');
        if (storedStatistics) {
          setStatistics(JSON.parse(storedStatistics));
        }
      } catch (error) {
        console.log('Error retrieving statistics:', error);
      }
    };

    fetchStatistics();
  }, []);    

  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome5Icon name="user-circle" size={100} color="white" />
          <Text style={styles.label}>John Doe</Text>
        </View>

        <Text style={styles.label}>My statistics</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="chart-line" size={42} color="white" />
            <Text style={styles.statLabel}>{statistics ? statistics.totalWorkouts : ''}</Text>
            <Text style={styles.subLabel}>Workouts completed</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="fire-alt" size={42} color="white" />
            <Text style={styles.statLabel}>44 days</Text>
            <Text style={styles.subLabel}>Maximum Streak</Text>
          </View>
          <View style={styles.statContainer}>
            <FontAwesome5Icon name="clock" size={42} color="white" />
            <Text style={styles.statLabel}>218 min</Text>
            <Text style={styles.subLabel}>In average per week</Text>
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
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
};
