import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Vibration, Image, ActivityIndicator, TouchableOpacity, Pressable } from 'react-native';
import { Card, Text, Title, Button, Portal, Modal, FAB } from 'react-native-paper';
import WorkoutBarChart from '../components/WorkoutBarChart';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsScreen = ({ navigation }) => {
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noData, setNoData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAddWorkoutPress = () => {
    // Navigate to the Workout Type screen when the FAB is pressed
    navigation.navigate('AddWorkout');
    Vibration.vibrate(70);
  };

  const loadWorkoutData = async () => {
    try {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem('workoutData');
      if (storedData) {
        const parsedData = JSON.parse(storedData).reverse();
        setWorkoutData(parsedData);
        setNoData(parsedData.length === 0);
      } else {
        setWorkoutData([]);
        setNoData(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const showDeleteConfirmation = (workout) => {
    setSelectedWorkout(workout);
    setDeleteModalVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setSelectedWorkout(null);
    setDeleteModalVisible(false);
  };

  const deleteWorkout = () => {
    if (selectedWorkout) {
      const updatedWorkoutData = workoutData.filter((workout) => workout.id !== selectedWorkout.id);
      setWorkoutData(updatedWorkoutData);
      setSelectedWorkout(null);
      setDeleteModalVisible(false);
      AsyncStorage.setItem('workoutData', JSON.stringify(updatedWorkoutData));
      setNoData(updatedWorkoutData.length === 0);
    }
  };

  const renderWorkoutItem = ({ item }) => {
    const handleDeleteConfirmation = () => {
      showDeleteConfirmation(item);
      Vibration.vibrate(30);
    };

    return (
      <Card style={styles.card}>
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <Card.Content style={{ flex: 1, paddingBottom: 8 }}>
            <Title style={styles.title}>{item.type}</Title>
            <Text style={styles.text}>Intensity: {item.intensity}</Text>
            <Text style={styles.text}>Duration: {item.duration}</Text>
            <Text style={styles.text}>Specifics: {item.specifics.join(', ')}</Text>
            <Text style={styles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <TouchableOpacity onPress={handleDeleteConfirmation} style={{ position: 'absolute', top: 10, right: 10 }}>
              <FontAwesome5Icon
                name={'pen'}
                color={'white'}
                size={18}
              />
            </TouchableOpacity>
          </Card.Actions>
        </View>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <WorkoutBarChart data={[10, 40, 20, 40, 20, 50, 20]} />
      <Pressable
        onPress={() => setDrawerOpen(!drawerOpen)}
        style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}
      >
        <Text style={styles.title}>Workouts</Text>
        <FontAwesome5Icon
          name={drawerOpen ? 'chevron-up' : 'chevron-down'}
          color={'white'}
          size={24}
          style={{ marginLeft: 10 }}
        />
      </Pressable>
      {drawerOpen && (
        <FlatList
          data={workoutData}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          style={styles.flatList}
          overScrollMode="never"
        />
      )}

      <Portal>
        <Modal
          visible={isDeleteModalVisible}
          onDismiss={hideDeleteConfirmation}
          contentContainerStyle={styles.deleteModal}
        >
          <Text style={styles.modalText}>Are you sure you want to delete this workout?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button onPress={hideDeleteConfirmation}>Cancel</Button>
            <Button onPress={deleteWorkout} textColor="red">Confirm Delete</Button>
          </View>
        </Modal>
      </Portal>

      <FAB
        icon={({ color, size }) => (
          <FontAwesome5Icon name="plus" color={'#282828'} size={size} />
        )}
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: 'white' }}
        onPress={handleAddWorkoutPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 16,
  },
  noDataText: {
    color: 'white',
    fontSize: 18,
    paddingTop: 16,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  flatList: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#161616',
    borderColor: '#282828',
    borderWidth: 1,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
  },
  deleteModal: {
    backgroundColor: '#1C1B1F',
    borderRadius: 16,
    margin: 16,
    padding: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    color: 'white',
  },
});

export default StatsScreen;
