import React, { useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
          borderColor: selectedCardIndex === index ? 'white' : 'grey',
        },
      ]}
      onPress={() => handleCardPress(index)}
    >
      <Text style={styles.cardText}>{item}</Text>
      {selectedCardIndex === index ? (
        <FontAwesome5Icon
          name="check-circle"
          size={20}
          color="white"
          style={styles.checkIcon}
        />
      ) : (
        <FontAwesome5Icon
          name="check-circle"
          size={20}
          color="grey" // Grey when not selected
          style={styles.checkIcon}
        />
      )}
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
    flex: 2,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    padding: 16,
  },
});

export default WorkoutTypeScreen;
