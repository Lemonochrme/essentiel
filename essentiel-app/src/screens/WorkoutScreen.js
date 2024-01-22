import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const WorkoutScreen = ({ navigation }) => {
  const handleAddWorkoutPress = () => {
    // Navigate to the Workout Type screen when the button is pressed
    navigation.navigate('WorkoutType');
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text>Workout Content Here</Text>
        </Card.Content>
      </Card>

      <Button
        icon={({ color, size }) => (
          <FontAwesome5Icon name="plus" color={color} size={size} />
        )}
        mode="contained"
        onPress={handleAddWorkoutPress}
        style={styles.addButton}
      >
        Add Workout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginTop: 16,
  },
});

export default WorkoutScreen;
