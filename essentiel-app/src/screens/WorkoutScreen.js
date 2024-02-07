import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, Vibration, ActivityIndicator } from 'react-native';
import { Card, FAB, ProgressBar, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutBarChart from './WorkoutBarChart';
import FiveDaysCalendar from './SimpleCalendar';
import WeekdaysChecker from './WeekdaysChecker';


const WorkoutScreen = ({ navigation }) => {
  const [totalWeekExerciseTime, setTotalWeekExerciseTime] = useState(0);
  const [totalWorkoutTimeByDay, setTotalWorkoutTimeByDay] = useState(Array(7).fill(0));
  const [isLoading, setIsLoading] = useState(true);

  const calculateTotalWorkoutTimeByDay = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  

  const getMessage = (percentage) => {
    if (percentage >= 100) {
      return "You've reached your weekly exercise goal!";
    } else if (percentage >= 90) {
      return 'Almost there. Keep going!';
    } else if (percentage === 0) {
      return "Let's get started by adding a workout!";
    } else {
      return `You've completed ${percentage}% of your weekly goal.`;
    }
  };

  const handleAddWorkoutPress = () => {
    navigation.navigate('AddWorkout');
    Vibration.vibrate(70);
  };

  useEffect(() => {
    calculateTotalWorkoutTimeByDay();
  }, []);

  const percentage = Math.min((totalWeekExerciseTime / 150) * 100, 100).toFixed(0); // 150 minutes for now
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
      <FiveDaysCalendar />
      <Card style={{ backgroundColor: '#282828', marginTop: 16 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center' }}>
              <FontAwesome5Icon
                name="fire-alt"
                size={50}
                color={totalWeekExerciseTime === 0 ? 'grey' : 'white'}
              />
            </View>
            <View style={{ flex: 4 }}>
              {totalWeekExerciseTime === 0 ? (
                <Title style={{ color: 'white', fontWeight: '600', fontSize: 24 }}>No exercise this week</Title>
              ) : (
                <Title style={{ color: 'white', fontWeight: '600', fontSize: 24 }}>You're on fire!</Title>
              )}
              <Text style={{ fontSize: 18, color: 'white' }}>
                {totalWeekExerciseTime === 0 ? 'Start by adding a workout' : message}
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={Math.min(totalWeekExerciseTime / 150, 1)} // 150 minutes for now
            color={'white'}
            style={{ borderRadius: 10, height: 10, marginTop: 16, backgroundColor: '#161616'}}
          />
        </Card.Content>
      </Card>

      <Text style={styles.label}>Overview</Text>
        <WeekdaysChecker workoutDays={totalWorkoutTimeByDay} />
      <ScrollView>
        <Text style={styles.label}>Workout Time</Text>
        <WorkoutBarChart data={totalWorkoutTimeByDay} />
      </ScrollView>

      <FAB
        icon={({ color, size }) => (
          <FontAwesome5Icon name="plus" color={'black'} size={size} />
        )}
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: 'white' }}
        onPress={handleAddWorkoutPress}
        animated={false}
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

export default WorkoutScreen;