import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalculateStatistics from './CalculateStatistics';

const BackgroundWorker = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      console.log('Running background tasks...');
      CalculateStatistics();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return null; // BackgroundWorker doesn't render anything
};

export default BackgroundWorker;
