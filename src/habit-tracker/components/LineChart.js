import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const LineChart = ({
    data = [],
    title = 'Progress Chart',
    height = 200,
    colors = ['#4ECDC4', '#44A08D']
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [chartWidth] = useState(width - 120); // Increased margin for better layout
    const [chartHeight] = useState(height - 100); // More space for title and labels

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start();
    }, [data]);

    const maxValue = Math.max(...data, 1);
    const minValue = Math.min(...data, 0);
    const range = maxValue - minValue || 1;

    const getPointPosition = (index, value) => {
        const x = (index / (data.length - 1 || 1)) * chartWidth;
        const y = chartHeight - ((value - minValue) / range) * chartHeight;
        return { x, y };
    };

    const generatePath = () => {
        if (data.length === 0) return '';

        let path = '';
        data.forEach((value, index) => {
            const { x, y } = getPointPosition(index, value);
            if (index === 0) {
                path += `M ${x} ${y}`;
            } else {
                // Create smooth curves using quadratic bezier
                const prevPoint = getPointPosition(index - 1, data[index - 1]);
                const midX = (prevPoint.x + x) / 2;
                path += ` Q ${midX} ${prevPoint.y} ${midX} ${(prevPoint.y + y) / 2}`;
                path += ` Q ${midX} ${y} ${x} ${y}`;
            }
        });
        return path;
    };

    const generateGradientPath = () => {
        const path = generatePath();
        if (!path) return '';

        const lastPoint = getPointPosition(data.length - 1, data[data.length - 1]);
        return `${path} L ${lastPoint.x} ${chartHeight} L 0 ${chartHeight} Z`;
    };

    const renderGridLines = () => {
        const lines = [];
        for (let i = 0; i <= 4; i++) {
            const y = (i / 4) * chartHeight;
            lines.push(
                <View
                    key={i}
                    style={[
                        styles.gridLine,
                        {
                            top: y,
                            width: chartWidth,
                        },
                    ]}
                />
            );
        }
        return lines;
    };

    const renderDataPoints = () => {
        return data.map((value, index) => {
            const { x, y } = getPointPosition(index, value);
            return (
                <Animated.View
                    key={index}
                    style={[
                        styles.dataPoint,
                        {
                            left: x - 4,
                            top: y - 4,
                            transform: [
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={colors}
                        style={styles.pointGradient}
                    />
                </Animated.View>
            );
        });
    };

    return (
        <View style={[styles.container, { height }]}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.chartContainer}>
                <View style={[styles.chart, { width: chartWidth, height: chartHeight }]}>
                    {renderGridLines()}

                    {/* Gradient Area */}
                    <Animated.View
                        style={[
                            styles.gradientArea,
                            {
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 0.3],
                                }),
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={[`${colors[0]}60`, `${colors[1]}20`, 'transparent']}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </Animated.View>

                    {/* Data Points */}
                    {renderDataPoints()}

                    {/* Y-axis Labels */}
                    <View style={styles.yAxisLabels}>
                        {[...Array(5)].map((_, i) => {
                            const value = maxValue - (i / 4) * range;
                            return (
                                <Text key={i} style={[styles.axisLabel, { top: (i / 4) * chartHeight - 8 }]}>
                                    {Math.round(value)}
                                </Text>
                            );
                        })}
                    </View>
                </View>

                {/* X-axis Labels */}
                <View style={styles.xAxisLabels}>
                    {data.map((_, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.axisLabel,
                                { left: (index / (data.length - 1 || 1)) * chartWidth - 10 },
                            ]}
                        >
                            {index + 1}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    chartContainer: {
        alignItems: 'center',
    },
    chart: {
        position: 'relative',
        backgroundColor: 'transparent',
    },
    gridLine: {
        position: 'absolute',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    gradientArea: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    dataPoint: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    pointGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    yAxisLabels: {
        position: 'absolute',
        left: -25,
        height: '100%',
    },
    xAxisLabels: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        position: 'relative',
    },
    axisLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
    },
});

export default LineChart;