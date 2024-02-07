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
      console.log('No workouts recorded.');
      return;
    }

    // Calculate total number of workouts completed
    const totalWorkouts = workoutData.length;

    // Calculate dynamic week average workout duration
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const workoutsThisWeek = workoutData.filter(
      workout => new Date(workout.date) >= oneWeekAgo
    );

    let totalDurationThisWeek = 0;
    workoutsThisWeek.forEach(workout => {
      totalDurationThisWeek += parseInt(workout.duration);
    });

    const averageDurationThisWeek = totalDurationThisWeek / workoutsThisWeek.length;

    // Store calculated statistics back in AsyncStorage
    await AsyncStorage.setItem('statistics', JSON.stringify({
      totalWorkouts,
      averageDurationThisWeek
      // Add more statistics here as needed
    }));

    console.log('Statistics calculated and stored successfully.');
  } catch (error) {
    console.error('Error calculating statistics:', error);
  }
};

export default CalculateStatistics;
