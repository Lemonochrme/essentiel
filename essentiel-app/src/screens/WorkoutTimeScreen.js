import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const WorkoutTimeScreen = ({ navigation, route }) => {
  const [workoutTime, setWorkoutTime] = useState('');

  const handleSaveWorkoutTime = () => {
    const durationMinutes = parseInt(workoutTime);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      alert('Enter a valid workout duration.');
      return;
    }

    // JSON object built from the user's input
    const workoutData = {
      type: route.params.workoutType, // Retrieve the workout type from the previous screen's parameter
      intensity: route.params.workoutIntensity, // Retrieve the workout intensity from the previous screen's parameter
      duration_minutes: durationMinutes,
      date: new Date().toISOString(), // Today's date in YYYY-MM-DD format
    };

    console.log(workoutData);

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
