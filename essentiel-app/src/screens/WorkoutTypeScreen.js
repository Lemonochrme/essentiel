import React, { useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';

const WorkoutTypeScreen = ({ navigation }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const workoutTypes = ['Push', 'Pull', 'Legs'];

  const handleCardPress = (index) => {
    setSelectedCardIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: selectedCardIndex === index ? 'white' : 'grey', // Border color based on selection
        },
      ]}
      onPress={() => handleCardPress(index)}
    >
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Select Workout Type</Text>
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={workoutTypes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            const selectedWorkoutType =
              selectedCardIndex !== null ? workoutTypes[selectedCardIndex] : null;
            navigation.navigate('WorkoutIntensity', {
              workoutType: selectedWorkoutType,
            });
          }}
          disabled={selectedCardIndex === null}
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
  cardsContainer: {
    flex: 2, // Adjust the flex value to vertically center the cards
    paddingHorizontal: 16,
    justifyContent: 'center', // Center the cards vertically
  },
  card: {
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16, // Add margin between cards
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 16,
  },
});

export default WorkoutTypeScreen;
