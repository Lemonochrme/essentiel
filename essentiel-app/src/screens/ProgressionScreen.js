import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Title, Button, Portal, Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProgressionScreen = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [noData, setNoData] = useState(true);

  const loadWorkoutData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('workoutData');
      if (storedData) {
        const parsedData = JSON.parse(storedData).reverse();
        setWorkoutData(parsedData);
        setNoData(parsedData.length === 0);
      } else {
        setWorkoutData([]);
        setNoData(true);
      }
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  useEffect(() => {
    loadWorkoutData();

    const refreshInterval = setInterval(() => {
      loadWorkoutData();
    }, 1000);

    return () => clearInterval(refreshInterval);
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
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{item.type}</Title>
          <Text style={styles.text}>Intensity: {item.intensity}</Text>
          <Text style={styles.text}>Duration: {item.duration}</Text>
          <Text style={styles.text}>Specifics: {item.specifics.join(', ')}</Text>
          <Text style={styles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            icon={({ size, color }) => (
              <Icon name="delete" size={size} color="white" />
            )}
            onPress={() => showDeleteConfirmation(item)}
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {noData ? (
        <Text style={styles.noDataText}>No workout data available.</Text>
      ) : (
        <FlatList
          data={workoutData}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          style={styles.flatList}
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
            <Button onPress={deleteWorkout}>Confirm Delete</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: 'white',
    fontSize: 18,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  flatList: {
    width: '100%',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#25232A',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
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
  },
});

export default ProgressionScreen;
