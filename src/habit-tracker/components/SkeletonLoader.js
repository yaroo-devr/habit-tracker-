import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonLoader = ({
    width: itemWidth = width - 40,
    height = 20,
    borderRadius = 8,
    style = {},
    children,
    loading = true
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loading) {
            const animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                ])
            );
            animation.start();

            return () => animation.stop();
        }
    }, [loading]);

    const animatedStyle = {
        backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.25)'],
        }),
    };

    if (!loading) {
        return children || null;
    }

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    width: itemWidth,
                    height,
                    borderRadius,
                },
                animatedStyle,
                style,
            ]}
        />
    );
};

// Predefined skeleton components for common use cases
export const SkeletonText = ({ lines = 1, style = {} }) => (
    <View style={style}>
        {Array.from({ length: lines }, (_, index) => (
            <SkeletonLoader
                key={index}
                height={16}
                width={index === lines - 1 ? width * 0.6 : width - 40}
                style={{ marginBottom: index < lines - 1 ? 8 : 0 }}
            />
        ))}
    </View>
);

export const SkeletonCard = ({ style = {} }) => (
    <View style={[styles.skeletonCard, style]}>
        <SkeletonLoader width={80} height={80} borderRadius={40} />
        <View style={styles.skeletonCardContent}>
            <SkeletonLoader width={120} height={20} style={{ marginBottom: 8 }} />
            <SkeletonLoader width={80} height={16} />
        </View>
    </View>
);

export const SkeletonChart = ({ style = {} }) => (
    <View style={[styles.skeletonChart, style]}>
        <SkeletonLoader width={width - 80} height={20} style={{ marginBottom: 16 }} />
        <SkeletonLoader width={width - 80} height={160} borderRadius={12} />
    </View>
);

const styles = StyleSheet.create({
    skeleton: {
        overflow: 'hidden',
    },
    skeletonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        marginVertical: 8,
    },
    skeletonCardContent: {
        flex: 1,
        marginLeft: 16,
    },
    skeletonChart: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        marginVertical: 8,
    },
});

export default SkeletonLoader;