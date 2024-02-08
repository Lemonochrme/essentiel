import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Vibration } from 'react-native';
import { Text, Button, Chip, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './CustomButtom';

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
    'Push',
    'Pull',
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
    Vibration.vibrate(70);
    // Create a new workout object
    const newWorkout = {
      id: Date.now().toString(), // Generate a unique ID
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

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text style={styles.label}>Workout Type</Text>
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
            <Text style={styles.label}>Specifics</Text>
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

        <View style={{ height: 2, width: '100%', backgroundColor: '#282828', borderRadius: 10, marginVertical: 16 }} />

        <Text style={styles.label}>Intensity</Text>
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

        <View style={{ height: 2, width: '100%', backgroundColor: '#282828', borderRadius: 10, marginVertical: 16 }} />

        <Text style={styles.label}>Duration</Text>
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
      <View style={{ padding: 16 }}>
        <CustomButton title="Save Workout" onPress={saveWorkout} disabled={isSaveButtonDisabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    margin: 4,
    backgroundColor: 'white',
  },
  saveButton: {
    margin: 16,
  },
});

export default AddWorkoutScreen;