import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressCircle = ({ progress = 0 }) => {
    return (
        <View style={styles.container}>
            <Text>Progress: {progress}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
});

export default ProgressCircle;