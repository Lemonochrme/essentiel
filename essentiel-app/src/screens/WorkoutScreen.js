import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, ProgressBar, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutScreen = ({ navigation }) => {
  const [totalWeekExerciseTime, setTotalWeekExerciseTime] = useState(0);

  const handleAddWorkoutPress = () => {
    // Navigate to the Workout Type screen when the button is pressed
    navigation.navigate('AddWorkout');
  };

  useEffect(() => {
    // Calculate the total exercise time for the week
    const calculateTotalWeekExerciseTime = async () => {
      try {
        const storedData = await AsyncStorage.getItem('workoutData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
          const totalExerciseTime = parsedData
            .filter((workout) => new Date(workout.date) >= oneWeekAgo)
            .reduce((total, workout) => total + parseInt(workout.duration.split(' ')[0]), 0);
          setTotalWeekExerciseTime(totalExerciseTime);
        }
      } catch (error) {
        console.error('Error calculating total week exercise time:', error);
      }
    };

    calculateTotalWeekExerciseTime();
  }, []);

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontWeight: '600', fontSize: 25, paddingVertical: 10 }}>
        Welcome back.
      </Title>
      <Card>
        <Card.Content>
          <Title style={{ color: 'white', fontWeight: '600' }}>
            {totalWeekExerciseTime} min
          </Title>
          <Text style={{ color: 'white' }}>of exercise this week</Text>
          <Text style={{ textAlign: 'right', fontSize: 12, color: 'grey' }}>
            {Math.min((totalWeekExerciseTime / 120) * 100, 100).toFixed(0)}%
          </Text>
          <ProgressBar
            progress={Math.min(totalWeekExerciseTime / 120, 1)} // Assuming 120 minutes is the target
            color={'white'}
            style={{ borderRadius: 10 }}
          />
          <Text style={{ marginTop: 5, textAlign: 'left', fontSize: 12, color: 'grey' }}>
            Almost there. Keep going!
          </Text>
        </Card.Content>
      </Card>

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/illustration.png')}
          style={{ width: 250, height: 350, transform: [{ rotate: '90deg' }] }}
          opacity={0.8}
        />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          icon={({ color, size }) => (
            <FontAwesome5Icon name="plus-circle" color={'black'} size={size} />
          )}
          mode="contained"
          onPress={handleAddWorkoutPress}
          style={{ width: 180, alignSelf: 'center', backgroundColor: 'white' }}
          labelStyle={{ fontWeight: '600', color: 'black' }}
        >
          Add Workout
        </Button>
      </View>
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
