import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const WorkoutBarChart = ({ data }) => {
    const maxValue = Math.max(...data); // Find the maximum value in the data array
    const range = Math.ceil(maxValue / 3); // Determine the range of y-axis values
    const yAxisValues = Array.from({ length: 4 }, (_, i) => i * range).reverse(); // Generate y-axis values

    // Check if all data values are zero
    const isNoData = data.every((value) => value === 0);

    return (
        <Card style={styles.card}>
            {isNoData ? (
                <Text style={styles.noDataText}>Nothing to see here</Text>
            ) : (
                <View style={styles.container}>
                    <View style={styles.yAxisContainer}>
                        {yAxisValues.map((value, index) => (
                            <Text key={index} style={styles.yAxisLabel}>
                                {value}
                            </Text>
                        ))}
                    </View>
                    {data.map((value, index) => (
                        <View
                            key={index}
                            style={styles.barContainer}
                        >
                            <View
                                style={[
                                    styles.bar,
                                    { height: `${(value / maxValue) * 76}%` },
                                ]}
                            />
                            <Text style={styles.label}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#161616',
        borderColor: '#282828',
        borderWidth: 1,
        borderRadius: 24,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 150,
    },
    barContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    bar: {
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    label: {
        color: 'white',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        color: 'lightgrey',
    },
    yAxisContainer: {
        justifyContent: 'space-between',
        height: 150,
        paddingBottom: 20,
        paddingTop: 8,
    },
    yAxisLabel: {
        color: 'white',
    },
});

export default WorkoutBarChart;
