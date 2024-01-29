import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const workoutTypes = ['Cardio', 'Strength Training', 'Yoga', 'HIIT'];
const workoutIntensityLevels = [
  {
    level: 'Low',
    description: 'Low intensity workouts are less strenuous and suitable for beginners or recovery days.',
  },
  {
    level: 'Moderate',
    description: 'Moderate intensity workouts provide a good balance of challenge and endurance.',
  },
  {
    level: 'High',
    description: 'High intensity workouts are intense and may require more energy and effort.',
  },
];
const workoutDurations = ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '90 minutes', '120 minutes'];

// Configuration object for additional options per workout type
const workoutTypeOptions = {
  'Cardio': [
    'Running',
    'Cycling',
    'Swimming',
    'Jump Rope',
    'Elliptical',
    'Stair Climbing',
    'Dance',
    'Boxing',
  ],
  'Strength Training': [
    'Upper Body',
    'Lower Body',
    'Full Body',
    'Chest',
    'Back',
    'Legs',
    'Arms',
    'Shoulders',
  ],
  'Yoga': ['Hatha Yoga', 'Vinyasa Yoga', 'Power Yoga'],
  'HIIT': ['Tabata', 'Circuit', 'Interval'],
};

const STORAGE_KEY = 'workoutData';

const AddWorkoutScreen = ({ navigation, route }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSpecifics, setSelectedSpecifics] = useState([]);
  const [intensityDescription, setIntensityDescription] = useState('');
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    // Load stored workout data from AsyncStorage when the component mounts
    loadWorkoutData();
  }, []);

  useEffect(() => {
    // Save workoutData to AsyncStorage whenever it changes
    saveWorkoutData();
  }, [workoutData]);

  const isSaveButtonDisabled = !(
    selectedType &&
    selectedIntensity &&
    selectedDuration &&
    (selectedType !== 'Strength Training' || selectedSpecifics.length > 0)
  );

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleIntensitySelection = (intensity) => {
    setSelectedIntensity(intensity);
    // Set the intensity description based on the selected intensity
    const selectedIntensityObj = workoutIntensityLevels.find((item) => item.level === intensity);
    if (selectedIntensityObj) {
      setIntensityDescription(selectedIntensityObj.description);
    } else {
      setIntensityDescription('');
    }
  };

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const handleSpecificsSelection = (specific) => {
    if (selectedSpecifics.includes(specific)) {
      // Deselect if already selected
      setSelectedSpecifics(selectedSpecifics.filter((item) => item !== specific));
    } else {
      // Select if not already selected
      setSelectedSpecifics([...selectedSpecifics, specific]);
    }
  };

  const saveWorkoutData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workoutData));
    } catch (error) {
      console.error('Error saving workout data:', error);
    }
  };

  const loadWorkoutData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setWorkoutData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  const saveWorkout = () => {
    // Create a new workout object
    const newWorkout = {
      id: Date.now().toString(), // Generate a unique ID (you can use a more robust method)
      type: selectedType,
      intensity: selectedIntensity,
      duration: selectedDuration,
      specifics: selectedSpecifics,
      date: new Date().toISOString(), // Store the current date and time
    };

    // Add the new workout to the workoutData array
    setWorkoutData([...workoutData, newWorkout]);

    // Clear selections after saving
    setSelectedType('');
    setSelectedIntensity('');
    setSelectedDuration('');
    setSelectedSpecifics([]);
    setIntensityDescription('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text style={styles.label}>Select Workout Type</Text>
        <View style={styles.chipContainer}>
          {workoutTypes.map((type) => (
            <Chip
              key={type}
              selected={selectedType === type}
              onPress={() => handleTypeSelection(type)}
              style={styles.chip}
            >
              {type}
            </Chip>
          ))}
        </View>

        {selectedType && workoutTypeOptions[selectedType] && (
          <>
            <Text style={styles.label}>Select Specifics</Text>
            <View style={styles.chipContainer}>
              {workoutTypeOptions[selectedType].map((specific) => (
                <Chip
                  key={specific}
                  selected={selectedSpecifics.includes(specific)}
                  onPress={() => handleSpecificsSelection(specific)}
                  style={styles.chip}
                >
                  {specific}
                </Chip>
              ))}
            </View>
          </>
        )}      

        <Text style={styles.label}>Select Intensity</Text>
        <View style={styles.chipContainer}>
          {workoutIntensityLevels.map((intensity) => (
            <Chip
              key={intensity.level}
              selected={selectedIntensity === intensity.level}
              onPress={() => handleIntensitySelection(intensity.level)}
              style={styles.chip}
            >
              {intensity.level}
            </Chip>
          ))}
        </View>

        {intensityDescription !== '' && (
          <Text style={styles.intensityDescription}>{intensityDescription}</Text>
        )}

        <Text style={styles.label}>Select Duration</Text>
        <View style={styles.chipContainer}>
          {workoutDurations.map((duration) => (
            <Chip
              key={duration}
              selected={selectedDuration === duration}
              onPress={() => handleDurationSelection(duration)}
              style={styles.chip}
            >
              {duration}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <Button
        mode="contained"
        onPress={saveWorkout}
        disabled={isSaveButtonDisabled}
        style={styles.saveButton}
      >
        Save Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1F',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  intensityDescription: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    margin: 4,
  },
  saveButton: {
    margin: 16,
  },
});

export default AddWorkoutScreen;
