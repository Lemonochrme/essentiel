import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WorkoutTimeScreen = ({ navigation, route }) => {
  const [workoutTime, setWorkoutTime] = useState('');

  const handleSaveWorkoutTime = async () => {
    const durationMinutes = parseInt(workoutTime);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      alert('Enter a valid workout duration.');
      return;
    }
  
    const newWorkoutData = {
      type: route.params.workoutType,
      intensity: route.params.workoutIntensity,
      duration_minutes: durationMinutes,
      date: new Date().toISOString(),
    };
  
    try {
      // Retrieve existing workouts
      const existingWorkouts = await AsyncStorage.getItem('workouts');
      let workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
  
      // Add the new workout to the array
      workouts.push(newWorkoutData);
  
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
  
      // DEBUG: Print the updated workouts data structure to the console
      console.log('Updated Workouts Data Structure:', workouts);
  
      alert('Workout data saved successfully!');
    } catch (e) {
      console.error('Error saving workout data:', e);
      alert('Failed to save the data to the storage');
    }
  
    navigation.navigate('Home', { screen: 'workout', params: { tabIndex: 0 } });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
            label="Workout Time (minutes)"
            value={workoutTime}
            onChangeText={(text) => setWorkoutTime(text)}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSaveWorkoutTime}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#1C1B1F',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    buttonContainer: {
      padding: 16,
    },
  });

export default WorkoutTimeScreen;
