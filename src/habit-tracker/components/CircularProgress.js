import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CircularProgress = ({
    progress = 0,
    size = 120,
    strokeWidth = 8,
    title = '',
    subtitle = '',
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1']
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <LinearGradient
                colors={colors}
                style={[styles.gradient, { width: size, height: size, borderRadius: size / 2 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.innerCircle, {
                    width: size - strokeWidth * 2,
                    height: size - strokeWidth * 2,
                    borderRadius: (size - strokeWidth * 2) / 2
                }]}>
                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </LinearGradient>

            <Animated.View
                style={[
                    styles.progressRing,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: strokeWidth,
                        transform: [{ rotate: '-90deg' }]
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    innerCircle: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    progressText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: '#34495E',
        marginTop: 2,
    },
    subtitle: {
        fontSize: 10,
        color: '#7F8C8D',
        marginTop: 1,
    },
    progressRing: {
        position: 'absolute',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default CircularProgress;