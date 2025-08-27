import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { myColors } from '../styles/Colors';

const CalculatorButton = ({
    title,
    onPress,
    type = 'number',
    isWide = false,
    isActive = false
}) => {
    const theme = useContext(ThemeContext);

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
                baseStyle.push([styles.functionButton, { backgroundColor: theme === 'light' ? myColors.btnGray : myColors.btnDark }]);
                break;
            default:
                baseStyle.push([styles.numberButton, { backgroundColor: theme === 'light' ? myColors.white : myColors.btnDark }]);
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
                baseStyle.push([styles.functionButtonText, { color: theme === 'light' ? myColors.white : myColors.white }]);
                break;
            default:
                baseStyle.push([styles.numberButtonText, { color: theme === 'light' ? myColors.black : myColors.white }]);
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
        height: 80,
        marginHorizontal: 5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wideButton: {
        flex: 2,
        marginRight: 5,
    },
    numberButton: {
        // Dynamic background in getButtonStyle
    },
    operatorButton: {
        backgroundColor: myColors.blue,
    },
    activeOperatorButton: {
        backgroundColor: myColors.white,
    },
    functionButton: {
        // Dynamic background in getButtonStyle
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '400',
    },
    numberButtonText: {
        // Dynamic color in getTextStyle
    },
    operatorButtonText: {
        color: myColors.white,
        fontSize: 35,
    },
    activeOperatorButtonText: {
        color: myColors.blue,
        fontSize: 35,
    },
    functionButtonText: {
        // Dynamic color in getTextStyle
    },
});

export default CalculatorButton;