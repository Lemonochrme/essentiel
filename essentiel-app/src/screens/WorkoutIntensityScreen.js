import React, { useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const WorkoutIntensityScreen = ({ navigation, route }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const intensities = ['Light', 'Moderate', 'Heavy'];

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
          color="grey"
          style={styles.checkIcon}
        />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Title>Select Workout Intensity</Title>
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={intensities}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            const selectedIntensity =
              selectedCardIndex !== null ? intensities[selectedCardIndex] : null;
            navigation.navigate('WorkoutTime', {
              workoutType: route.params.workoutType,
              workoutIntensity: selectedIntensity,
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

export default WorkoutIntensityScreen;
