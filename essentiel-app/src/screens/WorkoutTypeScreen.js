import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const WorkoutTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Select Workout Type</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            // Handle workout type selection and navigate to the Intensity screen
            navigation.navigate('Intensity');
          }}
        >
          Next
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

export default WorkoutTypeScreen;