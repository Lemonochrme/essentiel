import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, TextInput, Dialog, Portal, Text, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const AppOptionsScreen = () => {
  const [confirmationText, setConfirmationText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = async () => {
    if (confirmationText === 'delete') {
      try {
        await AsyncStorage.clear(); // This clears all data, adapt as needed.
        setShowConfirmation(false);
        showToast('All workout data has been deleted.');
      } catch (error) {
        console.error('Error deleting data: ', error);
        showToast('An error occurred while deleting data.');
      }
    } else {
      setShowConfirmation(false);
    }
  };

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

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Options</Text>
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
          onPress={() => setShowConfirmation(true)}
          style={styles.button}
        >
          Delete All Workout Data
        </Button>
        <Portal>
          <Dialog
            visible={showConfirmation}
            onDismiss={() => setShowConfirmation(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={{ color: 'white' }}>Delete Confirmation</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.confirmationText}>
                Are you sure you want to delete all the workout data?
              </Text>
              <TextInput
                label="Please type 'delete' to confirm"
                onChangeText={(text) => setConfirmationText(text)}
                value={confirmationText}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { primary: 'white' } }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDeleteConfirmation}>Confirm</Button>
              <Button onPress={() => setShowConfirmation(false)}>Cancel</Button>
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
  input: {
    backgroundColor: '#201c1c',
    color: 'white',
  },
  dialog: {
    backgroundColor: '#201c1c',
  },
});

export default AppOptionsScreen;
