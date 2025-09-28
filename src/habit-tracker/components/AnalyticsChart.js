import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnalyticsChart = () => {
    return (
        <View style={styles.container}>
            <Text>Analytics Chart Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 8,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AnalyticsChart;