import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HabitCard = () => {
    return (
        <View style={styles.container}>
            <Text>HabitCard Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
    },
});

export default HabitCard;