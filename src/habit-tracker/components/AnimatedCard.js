import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedCard = ({
    children,
    style = {},
    onPress,
    gradient = ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
    animationType = 'fadeInUp',
    delay = 0
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        let animations = [];

        switch (animationType) {
            case 'fadeInUp':
                animations = [
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 600,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 600,
                        delay,
                        useNativeDriver: true,
                    }),
                ];
                break;
            case 'scale':
                animations = [
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        tension: 50,
                        friction: 7,
                        delay,
                        useNativeDriver: true,
                    }),
                ];
                break;
            case 'fadeIn':
            default:
                animations = [
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        delay,
                        useNativeDriver: true,
                    }),
                ];
                break;
        }

        Animated.parallel(animations).start();
    }, []);

    const getAnimatedStyle = () => {
        const baseStyle = {
            opacity: fadeAnim,
        };

        switch (animationType) {
            case 'fadeInUp':
                return {
                    ...baseStyle,
                    transform: [{ translateY }],
                };
            case 'scale':
                return {
                    ...baseStyle,
                    transform: [{ scale: scaleAnim }],
                };
            default:
                return baseStyle;
        }
    };

    const CardComponent = onPress ? TouchableOpacity : View;

    return (
        <Animated.View style={[styles.container, getAnimatedStyle(), style]}>
            <CardComponent
                style={styles.touchable}
                onPress={onPress}
                activeOpacity={onPress ? 0.8 : 1}
            >
                <LinearGradient
                    colors={gradient}
                    style={styles.gradient}
                >
                    {children}
                </LinearGradient>
            </CardComponent>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    touchable: {
        borderRadius: 16,
    },
    gradient: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default AnimatedCard;