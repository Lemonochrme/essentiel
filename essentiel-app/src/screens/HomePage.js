import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Vibration } from 'react-native';

import WorkoutScreen from './WorkoutScreen'; 
import ProgressionScreen from './../screens/ProgressionScreen'; 

const HomePage = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'workout', title: 'Workout', icon: 'dumbbell' },
    { key: 'progression', title: 'Progression', icon: 'stats-chart' },
  ]);

  const handleIndexChange = (index) => {
    Vibration.vibrate(70);
    setIndex(index);
  };

  const renderScene = BottomNavigation.SceneMap({
    workout: () => <WorkoutScreen navigation={navigation} />, // Pass navigation prop to WorkoutScreen
    progression: ProgressionScreen,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        renderIcon={({ route, color }) => {
          switch (route.key) {
            case 'workout':
              return <FontAwesome5 name="dumbbell" size={24} color={color} />;
            case 'progression':
              return <Ionicons name="stats-chart" size={24} color={color} />;
            default:
              return null;
          }
        }}
      />
    </>
  );
}

export default HomePage;
