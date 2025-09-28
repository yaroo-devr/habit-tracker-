import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';

const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    placeholder = '',
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 1,
    style = {},
    inputStyle = {},
    labelStyle = {},
    focusedColor = '#4ECDC4',
    unfocusedColor = 'rgba(255, 255, 255, 0.6)',
    borderColor = 'rgba(255, 255, 255, 0.3)',
    focusedBorderColor = '#4ECDC4'
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const labelAnimatedStyle = {
        position: 'absolute',
        left: 16,
        top: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [multiline ? 20 : 16, -8],
        }),
        fontSize: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [unfocusedColor, isFocused ? focusedColor : unfocusedColor],
        }),
        backgroundColor: 'transparent',
        paddingHorizontal: 4,
        zIndex: 1,
    };

    const containerStyle = {
        borderColor: isFocused ? focusedBorderColor : borderColor,
        borderWidth: isFocused ? 2 : 1,
    };

    return (
        <View style={[styles.container, style]}>
            <Animated.Text style={[styles.label, labelAnimatedStyle, labelStyle]}>
                {label}
            </Animated.Text>
            <View style={[styles.inputContainer, containerStyle]}>
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        inputStyle,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFocused ? placeholder : ''}
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={multiline ? 'top' : 'center'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        position: 'relative',
    },
    label: {
        fontWeight: '500',
        position: 'absolute',
        backgroundColor: 'rgba(103, 126, 234, 0.1)',
        borderRadius: 4,
    },
    inputContainer: {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#FFFFFF',
        minHeight: 50,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
        paddingTop: 16,
    },
});

export default FloatingLabelInput;