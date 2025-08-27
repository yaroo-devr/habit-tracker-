import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { myColors } from '../styles/Colors';

const CalculatorDisplay = ({ value }) => {
    const theme = useContext(ThemeContext);

    // Adjust font size based on the length of the display value
    const getFontSize = () => {
        const length = value.length;
        if (length > 9) return 50;
        if (length > 7) return 60;
        return 70;
    };

    const textColor = theme === 'light' ? myColors.black : myColors.white;

    return (
        <View style={styles.container}>
            <Text style={[styles.displayText, { fontSize: getFontSize(), color: textColor }]}>
                {value}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    displayText: {
        fontWeight: '200',
        textAlign: 'right',
    },
});

export default CalculatorDisplay;