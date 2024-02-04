import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'; // Remove ToastAndroid import
import { Button, Dialog, Portal, Text, Provider, Card, Title } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsMenu from './SettingsMenu';

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

      // Removed showToast call

    } catch (error) {
      console.error('Error exporting data: ', error);
      // Removed showToast call
    }
  };

  const deleteWorkout = async () => {
    try {
      await AsyncStorage.clear(); // This clears all data, adapt as needed.
      setIsDeleteModalVisible(false);
      // Removed showToast call
    } catch (error) {
      console.error('Error deleting data: ', error);
      // Removed showToast call
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Card style={{ backgroundColor: '#161616', borderColor: '#282828', borderWidth: 1 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5Icon name="user-circle" size={50} color="white" style={{ marginRight: 16 }} />
                <View style={{ top: -3 }}>
                  <Title style={{ color: 'white' }}>Profile</Title>
                  <Text style={{ color: 'white' }}>Edit Profile</Text>
                </View>
              </View>
              <FontAwesome5Icon name="chevron-right" size={24} color="white" />
            </View>
          </Card.Content>
        </Card>

        <View style={{ paddingTop: 16 }}>
          <SettingsMenu />
        </View>

        <Button
          mode="outlined"
          labelStyle={{ color: 'red' }}
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
    backgroundColor: '#161616',
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
