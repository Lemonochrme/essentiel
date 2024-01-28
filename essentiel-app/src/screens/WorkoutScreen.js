import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, ProgressBar, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const WorkoutScreen = ({ navigation }) => {
  const handleAddWorkoutPress = () => {
    // Navigate to the Workout Type screen when the button is pressed
    navigation.navigate('AddWorkout');
  };

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontWeight: '600', fontSize: 25, paddingVertical: 10}}>Welcome back.</Title>
      <Card>
        <Card.Content>
          <Title style={{ color: 'white', fontWeight: '600'}}>2h30min</Title>
          <Text style={{ color: 'white' }}>of exercise this week</Text>
              <Text style={{ textAlign: 'right', fontSize: 12, color: 'grey' }}>50%</Text>
              <ProgressBar progress={0.5} color={'white'} style={{borderRadius: 10}} />
              <Text style={{ marginTop: 5, textAlign: 'left', fontSize: 12, color: 'grey' }}>Almost there. Keep going!</Text>
        </Card.Content>
      </Card>

      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/illustration.png')}
          style={{width: 250, height: 350, transform: [{rotate: '90deg'}]}}
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
          labelStyle={{fontWeight: '600', color: 'black' }}
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
