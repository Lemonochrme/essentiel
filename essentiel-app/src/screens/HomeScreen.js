import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, Vibration, ActivityIndicator, Image } from 'react-native';
import { Card, FAB, ProgressBar, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import WorkoutBarChart from '../components/WorkoutBarChart';
import FiveDaysCalendar from '../components/SimpleCalendar';
import WeekdaysChecker from '../components/WeekdaysChecker';


const HomeScreen = ({ navigation }) => {
  const [totalWeekExerciseTime, setTotalWeekExerciseTime] = useState(0);
  const [totalWorkoutTimeByDay, setTotalWorkoutTimeByDay] = useState(Array(7).fill(0));
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [profile, setProfile] = useState(null);

  const calculateTotalWorkoutTimeByDay = async () => {
    const storedData = await AsyncStorage.getItem('workoutData');
    const workoutData = JSON.parse(storedData || '[]');
    
    // Helper function to convert duration string to minutes
    const durationToMinutes = (duration) => parseInt(duration.split(' ')[0], 10);
    
    // Helper function to find the start of the current week (Monday)
    const getStartOfWeek = (date) => {
      const day = date.getDay(); // Get the current day of the week (0 for Sunday, 6 for Saturday)
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to previous Monday
      return new Date(date.setDate(diff));
    };
  
    // Determine the start and end of the current week
    const now = new Date();
    const startOfWeek = getStartOfWeek(new Date(now));
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of the week
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
    
    let weeklyTotal = Array(7).fill(0);
    
    workoutData.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      if (workoutDate >= startOfWeek && workoutDate <= endOfWeek) {
        const workoutDuration = durationToMinutes(workout.duration);
        const dayOfWeek = workoutDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        
        // Adjust dayOfWeek if your week starts on Monday
        const adjustedDayOfWeek = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust so Monday = 0, ..., Sunday = 6
        
        weeklyTotal[adjustedDayOfWeek] += workoutDuration;
      }
    });
    
    setTotalWorkoutTimeByDay(weeklyTotal);
    setTotalWeekExerciseTime(weeklyTotal.reduce((acc, cur) => acc + cur, 0));
  };
  

  const getMessage = (percentage) => {
    if (percentage >= 100) {
      return `You've reached your weekly exercise goal! Great job ${profile.name}!`;
    } else if (percentage === 0) {
      return "No workout this week. Let's get started by adding a workout!";
    } else {
      return `You've completed ${percentage}% of your weekly goal. You're doing great!`;
    }
  };

  const handleAddWorkoutPress = () => {
    navigation.navigate('AddWorkout');
    Vibration.vibrate(70);
  };

  const convertMinutesToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };
  

  useEffect(() => {
    calculateTotalWorkoutTimeByDay();
    const fetchData = async () => {
      try {
        const storedStatistics = await AsyncStorage.getItem('statisticsData');
        if (storedStatistics) {
          setStatistics(JSON.parse(storedStatistics));
        }

        const storedProfile = await AsyncStorage.getItem('profileData');
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  const goal = profile ? profile.trainingTimeGoal : 0;
  const percentage = profile ? Math.min((totalWeekExerciseTime / goal) * 100, 100).toFixed(0) : 0;
  const message = getMessage(percentage);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>Hi! Welcome back.</Title> 
      <Card style={{ backgroundColor: '#282828', marginTop: 16 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                {totalWeekExerciseTime === 0 ? "No workout this week. Let's get started by adding a workout!" : message}
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={totalWeekExerciseTime !== 0 ? Math.min(totalWeekExerciseTime / goal, 1) : 0}
            color={'white'}
            style={{ borderRadius: 10, height: 10, marginTop: 16, backgroundColor: '#161616'}}
          />
        </Card.Content>
      </Card>
      <Text style={styles.label}>Track your progress this week</Text>
        <WeekdaysChecker workoutDays={totalWorkoutTimeByDay} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
        <View style={{ position: 'absolute', top: -15, right: 60, margin: 16 }}>
          <Text style={{ color: 'lightgreen', fontSize: 16, fontWeight: 'bold' }}>+20%</Text>
        </View>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold'}}>{convertMinutesToHoursMinutes(totalWeekExerciseTime)}</Text>
        <Text style={{ color: '#505050', fontSize: 20, fontWeight: 'bold' }}>Of exercice this week</Text>
      </View>
      
      <ScrollView overScrollMode="never">
        <WorkoutBarChart data={totalWorkoutTimeByDay} />
      </ScrollView>

      <FAB
        icon={({ color, size }) => (
          <FontAwesome5Icon name="plus" color={'black'} size={size} />
        )}
        label="Add Workout"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: 'white', width: 150 }}
        onPress={handleAddWorkoutPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#161616',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 16,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default HomeScreen;