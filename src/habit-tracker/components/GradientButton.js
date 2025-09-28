import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
    title,
    onPress,
    colors = ['#FF6B6B', '#FF8E53'],
    style = {},
    textStyle = {},
    disabled = false,
    icon = null,
    size = 'medium'
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return {
                    button: { paddingVertical: 10, paddingHorizontal: 16 },
                    text: { fontSize: 14 }
                };
            case 'large':
                return {
                    button: { paddingVertical: 18, paddingHorizontal: 24 },
                    text: { fontSize: 18 }
                };
            default: // medium
                return {
                    button: { paddingVertical: 14, paddingHorizontal: 20 },
                    text: { fontSize: 16 }
                };
        }
    };

    const sizeStyles = getSizeStyles();
    const buttonColors = disabled ? ['#666', '#555'] : colors;

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={buttonColors}
                style={[styles.gradient, sizeStyles.button]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.content}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.text, sizeStyles.text, textStyle]}>
                        {title}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    gradient: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 8,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default GradientButton;