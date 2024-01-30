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
                yAxisSuffix=""
                fromZero={true}
                showValuesOnTopOfBars={true}
                withHorizontalLabels={false}
                showBarTops={false}
                chartConfig={{
                    fillShadowGradientFrom: 'white',
                    fillShadowGradientTo: 'white',
                    fillShadowGradientFromOpacity: 1,
                    fillShadowGradientToOpacity: 1,
                    backgroundGradientFrom: '#242329',
                    backgroundGradientTo: '#242329',
                    decimalPlaces: 0,
                    color: () => 'white',
                    barRadius: 8,
                    barPercentage: 0.4, // Adjust this value to make bars thinner
                    propsForBackgroundLines: {
                        strokeWidth: 1,
                        strokeDasharray: null,
                        stroke: '#242329',
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    paddingRight: 20,
                }}
            />
        </View>
    );
};

export default WorkoutBarChart;
