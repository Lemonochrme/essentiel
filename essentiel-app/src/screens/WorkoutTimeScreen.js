import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const WorkoutTimeScreen = ({ navigation }) => {
  const [workoutTime, setWorkoutTime] = useState('');

  const handleSaveWorkoutTime = () => {
    // Handle workout time input (you can save it to your data or perform any other logic)
    
    // Navigate back to the WorkoutScreen by changing the tab index to 0 (WorkoutScreen)
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
          onPress={() => {
            // Handle workout type selection and navigate to the Intensity screen
            navigation.navigate('Intensity');
          }}
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
