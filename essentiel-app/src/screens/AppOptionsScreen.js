import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Dialog, Portal, Text, Provider, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const AppOptionsScreen = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleExportCSV = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(data);

      // Prepare the CSV content
      let csvContent = 'Key,Value\n';
      values.forEach((item) => {
        csvContent += `"${item[0]}","${item[1] ? item[1] : ''}"\n`;
      });

      // Define the file path and write the CSV content
      const filePath = `${FileSystem.documentDirectory}workout_data.csv`;
      await FileSystem.writeAsStringAsync(filePath, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      showToast('Workout data has been exported as CSV.');

    } catch (error) {
      console.error('Error exporting data: ', error);
      showToast('An error occurred while exporting data as CSV.');
    }
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const deleteWorkout = async () => {
    try {
      await AsyncStorage.clear(); // This clears all data, adapt as needed.
      setIsDeleteModalVisible(false);
      showToast('All workout data has been deleted.');
    } catch (error) {
      console.error('Error deleting data: ', error);
      showToast('An error occurred while deleting data.');
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={{ color: 'white', fontWeight: '600' }}>Tests</Title>
          </Card.Content>
        </Card>


        <Button
          mode="contained"
          color="#FF0000"
          onPress={handleExportCSV}
          style={styles.button}
        >
          Export Workout Data as CSV
        </Button>
        <Text style={styles.dangerText}>Danger Zone</Text>
        <Button
          mode="contained"
          buttonColor="red"
          onPress={() => setIsDeleteModalVisible(true)}
          style={styles.button}
        >
          Delete All Workout Data
        </Button>
        <Portal>
          <Dialog
            visible={isDeleteModalVisible}
            onDismiss={() => setIsDeleteModalVisible(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={{ color: 'white' }}>Delete Confirmation</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.confirmationText}>
                Are you sure you want to delete all the workout data?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={deleteWorkout}>Confirm</Button>
              <Button onPress={() => setIsDeleteModalVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C1B1F',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  dangerText: {
    color: 'red',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  confirmationText: {
    color: 'white',
    marginBottom: 10,
  },
  dialog: {
    backgroundColor: '#201c1c',
  },
});

export default AppOptionsScreen;
