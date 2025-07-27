import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const CalculatorButton = ({
  title,
  onPress,
  type = 'number',
  isWide = false,
  isActive = false
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    if (isWide) {
      baseStyle.push(styles.wideButton);
    }

    switch (type) {
      case 'operator':
        baseStyle.push(styles.operatorButton);
        if (isActive) {
          baseStyle.push(styles.activeOperatorButton);
        }
        break;
      case 'function':
        baseStyle.push(styles.functionButton);
        break;
      default:
        baseStyle.push(styles.numberButton);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];

    switch (type) {
      case 'operator':
        if (isActive) {
          baseStyle.push(styles.activeOperatorButtonText);
        } else {
          baseStyle.push(styles.operatorButtonText);
        }
        break;
      case 'function':
        baseStyle.push(styles.functionButtonText);
        break;
      default:
        baseStyle.push(styles.numberButtonText);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: SIZES.buttonHeight,
    marginHorizontal: SIZES.spacing.small,
    borderRadius: SIZES.buttonBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton: {
    flex: 2,
    marginRight: SIZES.spacing.small,
  },
  numberButton: {
    backgroundColor: COLORS.numberButton,
  },
  operatorButton: {
    backgroundColor: COLORS.operatorButton,
  },
  activeOperatorButton: {
    backgroundColor: '#FFFFFF',
  },
  functionButton: {
    backgroundColor: COLORS.functionButton,
  },
  buttonText: {
    fontSize: SIZES.buttonFontSize,
    fontWeight: '400',
  },
  numberButtonText: {
    color: COLORS.numberButtonText,
  },
  operatorButtonText: {
    color: COLORS.operatorButtonText,
    fontSize: SIZES.operatorFontSize,
  },
  activeOperatorButtonText: {
    color: COLORS.operatorButton, // Orange text on white background
    fontSize: SIZES.operatorFontSize,
  },
  functionButtonText: {
    color: COLORS.functionButtonText,
  },
});

export default CalculatorButton;
