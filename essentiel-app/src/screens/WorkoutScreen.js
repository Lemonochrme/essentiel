import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, FAB, ProgressBar, Title } from 'react-native-paper'; // Import FAB
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutScreen = ({ navigation }) => {
  const [totalWeekExerciseTime, setTotalWeekExerciseTime] = useState(0);

  const getMessage = (percentage) => {
    if (percentage >= 100) {
      return "You've reached your weekly exercise goal!";
    } else if (percentage >= 90) {
      return 'Almost there. Keep going!';
    } else if (percentage === 0) {
      return "Let's get started by adding a workout!";
    } else {
      return 'Keep up the good work!';
    }
  };

  const handleAddWorkoutPress = () => {
    // Navigate to the Workout Type screen when the FAB is pressed
    navigation.navigate('AddWorkout');
  };

  useEffect(() => {
    // Function to calculate the total exercise time for the current week (from Monday to Sunday)
    const calculateTotalWeekExerciseTime = async () => {
      try {
        const storedData = await AsyncStorage.getItem('workoutData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const today = new Date();
          const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Start of current week (Monday)
          const currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of current week (Sunday)
          const totalExerciseTime = parsedData
            .filter((workout) => {
              const workoutDate = new Date(workout.date);
              return workoutDate >= currentWeekStart && workoutDate <= currentWeekEnd;
            })
            .reduce((total, workout) => total + parseInt(workout.duration.split(' ')[0]), 0);
          setTotalWeekExerciseTime(totalExerciseTime);
        }
      } catch (error) {
        console.error('Error calculating total week exercise time:', error);
      }
    };

    // Initial calculation
    calculateTotalWeekExerciseTime();

    // Periodically fetch new data every second (adjust the interval as needed)
    const intervalId = setInterval(() => {
      calculateTotalWeekExerciseTime();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const percentage = Math.min((totalWeekExerciseTime / 150) * 100, 100).toFixed(0); // 150 minutes for now
  const message = getMessage(percentage);

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontWeight: '600', fontSize: 25, paddingVertical: 10 }}>
        Hello, Welcome back!
      </Title>
      <Card>
        <Card.Content>
          <Title style={{ color: 'white', fontWeight: '600' }}>
            {totalWeekExerciseTime} minutes of exercise this week
          </Title>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
            <Text style={{ textAlign: 'left', fontSize: 12, color: 'grey' }}>{message}</Text>
            <Text style={{ textAlign: 'right', fontSize: 12, color: 'grey' }}>{percentage}%</Text>
          </View>
          <ProgressBar
            progress={Math.min(totalWeekExerciseTime / 150, 1)} // 150 minutes for now
            color={'white'}
            style={{ borderRadius: 10 }}
          />
        </Card.Content>
      </Card>

      {/* Replace the Button with FAB */}
      <FAB
        icon={({ color, size }) => (
          <FontAwesome5Icon name="plus-circle" color={'black'} size={size} />
        )}
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: 'white' }}
        onPress={handleAddWorkoutPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default WorkoutScreen;
