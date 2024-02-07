import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculateStatistics = async (workoutData) => {
  let totalWorkouts = 0;
  let totalDuration = 0;
  let weeklyAverageDuration = 0;

  if (workoutData && workoutData.length > 0) {
    totalWorkouts = workoutData.length;

    workoutData.forEach((workout) => {
      totalDuration += parseDuration(workout.duration);
    });

    weeklyAverageDuration = calculateWeeklyAverageDuration(workoutData);
  }

  const statistics = {
    totalWorkouts,
    totalDuration,
    weeklyAverageDuration
  };

  try {
    await AsyncStorage.setItem('workoutStatistics', JSON.stringify(statistics));
    console.log('Workout statistics stored:', statistics);
  } catch (error) {
    console.error('Error storing workout statistics:', error);
  }
};

const parseDuration = (durationString) => {
  const [hours = 0, minutes = 0] = durationString.split(' ')[0].split('h').map(Number);
  return hours * 60 + minutes;
};

const calculateWeeklyAverageDuration = (workoutData) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const workoutsWithinWeek = workoutData.filter((workout) => new Date(workout.date) >= sevenDaysAgo);

  if (workoutsWithinWeek.length === 0) {
    return 0;
  }

  let totalDuration = 0;
  workoutsWithinWeek.forEach((workout) => {
    totalDuration += parseDuration(workout.duration);
  });

  return totalDuration / workoutsWithinWeek.length;
};

export default calculateStatisticsAndStoreAsync;
