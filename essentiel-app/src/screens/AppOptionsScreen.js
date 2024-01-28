import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Dialog, Portal, Text, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppOptionsScreen = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteConfirmation = async () => {
    try {
      await AsyncStorage.clear(); // This clears all data, adapt as needed.
      setShowConfirmation(false);
      showToast('All workout data has been deleted.');
    } catch (error) {
      console.error('Error deleting data: ', error);
      showToast('An error occurred while deleting data.');
    }
  };

  const handleExportCSV = async () => {
    try {
      // Your CSV export code here
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
