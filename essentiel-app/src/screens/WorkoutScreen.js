import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card, FAB, ProgressBar, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutBarChart from './WorkoutBarChart';

const WorkoutScreen = ({ navigation }) => {
  const [totalWeekExerciseTime, setTotalWeekExerciseTime] = useState(0);
  const [workoutDays, setWorkoutDays] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalTimeByDay, setTotalTimeByDay] = useState([0, 0, 0, 0, 0, 0, 0]); // Initialize with zeros for each day of the week (Sun - Sat)

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

  const calculateWorkoutDays = async () => {
    try {
      const storedData = await AsyncStorage.getItem('workoutData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const today = new Date();
        const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // Start of current week (Monday)
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // End of current week (Sunday)
        const workoutDates = parsedData
          .filter((workout) => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= currentWeekStart && workoutDate <= currentWeekEnd;
          })
          .map((workout) => new Date(workout.date).getDay());
        setWorkoutDays(workoutDates);

        // Calculate total time by day for the current week
        const updatedTotalTimeByDay = [...totalTimeByDay]; // Create a copy of the current state
        parsedData.forEach((workout) => {
          const workoutDate = new Date(workout.date);
          if (workoutDate >= currentWeekStart && workoutDate <= currentWeekEnd) {
            const dayIndex = workoutDate.getDay();
            updatedTotalTimeByDay[dayIndex] += parseInt(workout.duration.split(' ')[0]);
          }
        });
        setTotalTimeByDay(updatedTotalTimeByDay); // Update the state with the new values

        // Set the chart data
        setChartData(updatedTotalTimeByDay);
      }
    } catch (error) {
      console.error('Error calculating workout days:', error);
    }
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
    calculateWorkoutDays();

    // Periodically fetch new data every second (adjust the interval as needed)
    const intervalId = setInterval(() => {
      calculateTotalWeekExerciseTime();
      calculateWorkoutDays();
    }, 4000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const percentage = Math.min((totalWeekExerciseTime / 150) * 100, 100).toFixed(0); // 150 minutes for now
  const message = getMessage(percentage);

  const renderWeekdays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay(); // Get the current day (0 for Sunday, 1 for Monday, etc.)

    return weekdays.map((day, index) => (
      <View key={day} style={{ alignItems: 'center' }}>
        <FontAwesome5Icon
          name={workoutDays.includes(index) ? 'check-square' : 'square'}
          color={index === today ? 'lightgrey' : workoutDays.includes(index) ? 'white' : 'grey'}
          size={20}
        />
        <Text style={{ color: 'grey' }}>{day}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center' }}>
              <FontAwesome5Icon name="fire-alt" size={50} color="grey" />
            </View>
            <View style={{ flex: 4 }}>
              {totalWeekExerciseTime === 0 ? (
                <Title style={{ color: 'white', fontWeight: '600' }}>No exercise this week</Title>
              ) : (
                <Title style={{ color: 'white', fontWeight: '600' }}>{totalWeekExerciseTime} minutes of exercise this week</Title>
              )}
              <Text style={{ fontSize: 16, color: 'grey' }}>
                {totalWeekExerciseTime === 0 ? 'Start by adding a workout' : message}
              </Text>
            </View>
          </View>
          <Text style={{ textAlign: 'right', fontSize: 12, color: 'grey' }}>{percentage}%</Text>
          <ProgressBar
            progress={Math.min(totalWeekExerciseTime / 150, 1)} // 150 minutes for now
            color={'white'}
            style={{ borderRadius: 10 }}
          />
        </Card.Content>
      </Card>
      <ScrollView>
        <Text style={styles.label}>Progress</Text>
        <View style={styles.weekdaysContainer}>{renderWeekdays()}</View>

        <Text style={styles.label}>Weekly statistics</Text>
        <WorkoutBarChart data={[40, 20, 100, 40, 60, 70, 60]} />
        <WorkoutBarChart data={[40, 20, 100, 40, 60, 70, 60]} />
        <WorkoutBarChart data={[40, 20, 100, 40, 60, 70, 60]} />
      </ScrollView>

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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default WorkoutScreen;
