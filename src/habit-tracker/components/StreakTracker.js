import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const StreakTracker = ({ streakCount = 0, targetDays = 30 }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: streakCount,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, [streakCount]);

    const renderStreakDots = () => {
        const dots = [];
        const maxDotsToShow = 14;
        const dotsToShow = Math.min(targetDays, maxDotsToShow);

        for (let i = 0; i < dotsToShow; i++) {
            const isCompleted = i < streakCount;
            dots.push(
                <Animated.View
                    key={i}
                    style={[
                        styles.streakDot,
                        isCompleted && styles.completedDot,
                        {
                            transform: [
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange: [i - 1, i, i + 1],
                                        outputRange: [1, 1.2, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {isCompleted && (
                        <LinearGradient
                            colors={['#FF6B6B', '#4ECDC4']}
                            style={styles.dotGradient}
                        />
                    )}
                </Animated.View>
            );
        }
        return dots;
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.card}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Current Streak</Text>
                    <View style={styles.streakBadge}>
                        <Text style={styles.streakNumber}>{streakCount}</Text>
                        <Text style={styles.streakLabel}>days</Text>
                    </View>
                </View>

                <View style={styles.dotsContainer}>
                    {renderStreakDots()}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.targetText}>Goal: {targetDays} days</Text>
                    <Text style={styles.progressText}>
                        {Math.round((streakCount / targetDays) * 100)}% complete
                    </Text>
                </View>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    streakBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
    },
    streakNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    streakLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    dotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 16,
    },
    streakDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedDot: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dotGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    targetText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default StreakTracker;