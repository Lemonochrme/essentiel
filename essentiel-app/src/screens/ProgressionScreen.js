import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from "react-native-chart-kit";


const ProgressionScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutData, setWorkoutData] = useState([]); // State to hold the data for LineChart

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const storedData = await AsyncStorage.getItem('workouts');
        const parsedWorkouts = storedData ? JSON.parse(storedData) : [];
        setWorkouts(parsedWorkouts);
        
        // Filter workouts for the current week
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
        
        const workoutsThisWeek = parsedWorkouts.filter(workout => {
          const workoutDate = new Date(workout.date);
          return workoutDate >= startOfWeek;
        });
        
        // Calculate total duration for each day of the week
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const totalDurationPerDay = new Array(7).fill(0);
        
        workoutsThisWeek.forEach(workout => {
          const workoutDate = new Date(workout.date);
          const dayIndex = workoutDate.getDay();
          totalDurationPerDay[dayIndex] += workout.duration_minutes;
        });
        
        // Create data for LineChart
        const chartData = {
          labels: dayOfWeek,
          datasets: [
            {
              data: totalDurationPerDay,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        };
        
        setWorkoutData(chartData);
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

      <View>
        {workoutData && workoutData.length > 0 ? (
          <LineChart
            data={workoutData}
            width={Dimensions.get("window").width} // from react-native
            withHorizontalLabels={false}
            height={220}
            yAxisSuffix=" min"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#28242c",
              backgroundGradientFrom: "#28242c",
              backgroundGradientTo: "#28242c",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "white"
              },
              propsForBackgroundLines: {
                stroke: 'white',
                strokeWidth: 0.1,
                strokeDasharray: '0'
              }
            }}
            bezier
            style={{
              margin: 16,
              borderRadius: 16,
              paddingRight: 0,
            }}
            renderDotContent={({ x, y, indexData }) => (
              indexData !== 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: y - 8,
                    left: x + 10,
                  }}>
                  <Text style={{ fontSize: 8 }}>
                    {indexData} min
                  </Text>
                </View>
              )
            )}
          />
        ) : (
          <Text>Error when attempting to display data.</Text>
        )}
      </View>



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
