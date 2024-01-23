import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressionScreen = () => {
  const [workoutData, setWorkoutData] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedData = await AsyncStorage.getItem('workouts');
        const workouts = storedData ? JSON.parse(storedData) : [];
        processWorkoutData(workouts);
      } catch (e) {
        console.log(e);
      }
    };

    fetchWorkouts();
  }, []);

  const processWorkoutData = (workouts) => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const workoutDurationByDay = daysOfWeek.map(() => 0);

    workouts.forEach(workout => {
      const dayIndex = new Date(workout.date).getDay();
      workoutDurationByDay[dayIndex] += workout.duration_minutes;
    });

    setWorkoutData({
      labels: daysOfWeek,
      datasets: [
        {
          data: workoutDurationByDay
        }
      ]
    });
  };

  return (
    <View style={styles.container}>
      {workoutData.labels && (
        <BarChart
          data={workoutData}
          width={Dimensions.get('window').width - 32} // from react-native
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 40,
  },
});

export default ProgressionScreen;
