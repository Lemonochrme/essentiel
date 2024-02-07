import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalculateStatistics from './CalculateStatistics';

const BackgroundWorker = () => {
  useEffect(() => {
    const calculateAndStoreStatistics = async () => {
      try {
        const data = await AsyncStorage.getItem('workoutData');
        if (data) {
          CalculateStatistics(JSON.parse(data));
          console.log('BackgroundWorker: Calculating and storing workout statistics')
        }
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    const intervalId = setInterval(calculateAndStoreStatistics, 10000); // Run every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return null; // BackgroundWorker doesn't render anything
};

export default BackgroundWorker;