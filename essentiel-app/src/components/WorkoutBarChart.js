import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const WorkoutBarChart = ({ data }) => {
    const maxValue = Math.max(...data); // Find the maximum value in the data array

    // Check if all data values are zero
    const isNoData = data.every((value) => value === 0);

    return (
        <Card style={styles.card}>
            {isNoData ? (
                <Text style={styles.noDataText}>Nothing to see here</Text>
            ) : (
                <View style={styles.container}>
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
});

export default WorkoutBarChart;
