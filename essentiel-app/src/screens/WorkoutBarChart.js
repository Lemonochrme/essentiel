import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const WorkoutBarChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: data,
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={chartData}
        width={350}
        height={200}
        yAxisSuffix=" min"
        fromZero={true}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WorkoutBarChart;
