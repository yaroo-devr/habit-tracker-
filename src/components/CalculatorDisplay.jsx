import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const CalculatorDisplay = ({ value }) => {
  // Adjust font size based on the length of the display value
  const getFontSize = () => {
    const length = value.length;
    if (length > 9) return SIZES.displayFontSize * 0.6;
    if (length > 7) return SIZES.displayFontSize * 0.8;
    return SIZES.displayFontSize;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.displayText, { fontSize: getFontSize() }]}>
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
    paddingHorizontal: SIZES.spacing.large,
    paddingBottom: SIZES.spacing.large,
  },
  displayText: {
    color: COLORS.displayText,
    fontWeight: '200',
    textAlign: 'right',
  },
});

export default CalculatorDisplay;
