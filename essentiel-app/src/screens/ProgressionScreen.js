import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ProgressionScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedData = await AsyncStorage.getItem('workouts');
        const parsedWorkouts = storedData ? JSON.parse(storedData) : [];
        setWorkouts(parsedWorkouts);
      } catch (e) {
        console.log(e);
      }
    };

    fetchWorkouts(); // Initial data fetch

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchWorkouts, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Title style={{ color: 'white', fontWeight: '600', fontSize: 25, paddingVertical: 10, alignSelf: 'flex-start' }}>Statistics</Title>
      {/* Your LineChart code here */}


      <Title style={{ color: 'white', fontWeight: '600', fontSize: 25, paddingVertical: 10, alignSelf: 'flex-start' }}>Workout List</Title>
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={workouts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ marginRight: 10 }}>{item.type}</Text>
                  <Text style={{ marginRight: 10 }}>{item.duration_minutes} minutes</Text>
                  <Icon name={getIntensityIcon(item.intensity)} size={24} color="grey" />
                </View>
              </Card.Content>
            </Card>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 40,
  },
  card: {
    marginVertical: 10,
  },
});

const getIntensityIcon = (intensity) => {
  switch (intensity) {
    case 'Light':
      return 'signal-cellular-1';
    case 'Moderate':
      return 'signal-cellular-2';
    case 'Heavy':
      return 'signal-cellular-3';
    default:
      return 'signal-cellular-outline';
  }
};

export default ProgressionScreen;
