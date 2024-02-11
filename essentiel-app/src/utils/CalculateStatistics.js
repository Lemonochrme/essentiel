import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculateStatistics = async () => {
  try {
    // Retrieve workout data from AsyncStorage
    const workoutDataJSON = await AsyncStorage.getItem('workoutData');
    if (!workoutDataJSON) {
      // Handle case where there is no workout data
      console.log('No workout data found.');
      return;
    }

    const workoutData = JSON.parse(workoutDataJSON);

    if (workoutData.length === 0) {
      // Handle case where there are no workouts recorded
      return;
    }

    // Calculate total number of workouts completed
    const totalWorkouts = workoutData.length;

    // Calculate total duration of all workouts
    let totalDuration = workoutData.reduce((acc, workout) => {
      // Extract duration from the workout and convert it to minutes
      const durationInMinutes = parseInt(workout.duration);
      return acc + durationInMinutes;
    }, 0);

    // Calculate average duration
    const averageDuration = parseInt(totalDuration / totalWorkouts);

    totalDuration = parseInt(totalDuration);

    // Calculate current streak and longest streak
    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = new Date().toISOString().split('T')[0]; // Get today's date
    let lastWorkoutDate;

    workoutData.forEach((workout) => {
      const workoutDate = workout.date.split('T')[0];
      if (workoutDate === currentDate) {
        currentStreak++;
      } else {
        if (!lastWorkoutDate || lastWorkoutDate !== currentDate) {
          currentStreak = 1;
        } else {
          currentStreak++;
        }
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      lastWorkoutDate = workoutDate;
      currentDate = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0]; // Decrement current date by 1 day
    });

    // Store calculated statistics back in AsyncStorage
    await AsyncStorage.setItem('statisticsData', JSON.stringify({
      totalWorkouts,
      averageDuration,
      currentStreak,
      longestStreak,
      totalDuration
    }));
  } catch (error) {
    console.error('Error calculating statistics:', error);
  }
};

export default CalculateStatistics;
