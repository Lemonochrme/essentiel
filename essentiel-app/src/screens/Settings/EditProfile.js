import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../CustomButtom';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [trainingTimeGoal, setTrainingTimeGoal] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Load saved data from AsyncStorage
      const savedData = await AsyncStorage.getItem('profileData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setName(parsedData.name || '');
        setTrainingTimeGoal(parsedData.trainingTimeGoal || '');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      // Save the updated profile data to AsyncStorage
      const profileData = {
        name,
        trainingTimeGoal,
      };
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      console.log('Profile data saved:', profileData);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
        placeholderTextColor="white"
      />

      <Text style={styles.label}>Training Time per Week Goal (minutes)</Text>
      <TextInput
        style={styles.input}
        value={trainingTimeGoal}
        onChangeText={(text) => setTrainingTimeGoal(text)}
        placeholder="Enter your goal"
        placeholderTextColor="white"
        keyboardType="numeric"
      />

      <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
        <CustomButton title="Save" onPress={saveProfileData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    color: 'black',
  },
});

export default EditProfileScreen;
