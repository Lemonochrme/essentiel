import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Vibration } from 'react-native';

import WorkoutScreen from './WorkoutScreen'; 
import ProgressionScreen from './../screens/ProgressionScreen'; 
import ProfileScreen from './ProfileScreen';

const HomePage = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'workout', title: 'Home', icon: 'dumbbell' },
    { key: 'progression', title: 'Stats', icon: 'stats-chart' },
    { key: 'profile', title: 'Profile', icon: 'user' }, // Add Profile route
  ]);

  const handleIndexChange = (index) => {
    Vibration.vibrate(70);
    setIndex(index);
  };

  const renderScene = BottomNavigation.SceneMap({
    workout: () => <WorkoutScreen navigation={navigation} />,
    progression: () => <ProgressionScreen navigation={navigation} />,
    profile: () => <ProfileScreen />, // Add ProfileScreen
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
              return <FontAwesome5 name="home" size={24} color={color} />;
            case 'progression':
              return <Ionicons name="stats-chart" size={24} color={color} />;
            case 'profile':
              return <Ionicons name="person" size={24} color={color} />;
            default:
              return null;
          }
        }}
        barStyle={{ backgroundColor: '#282828' }}
        activeColor='white'
        inactiveColor='grey'
        activeIndicatorStyle={{ backgroundColor: 'transparent', opacity: 0}}
      />
    </>
  );
}

export default HomePage;
