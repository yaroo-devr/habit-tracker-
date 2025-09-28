import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const BarChart = ({
    data = [],
    labels = [],
    title = 'Bar Chart',
    height = 200,
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
}) => {
    const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;
    const [chartWidth] = useState(width - 100); // Reduced margin for more chart space
    const [chartHeight] = useState(height - 100); // Balanced space for title and labels

    useEffect(() => {
        const animations = animatedValues.map((animatedValue, index) =>
            Animated.timing(animatedValue, {
                toValue: data[index] || 0,
                duration: 1500,
                delay: index * 200,
                useNativeDriver: false,
            })
        );

        Animated.stagger(100, animations).start();
    }, [data]);

    const maxValue = Math.max(...data, 1);
    const barSpacing = 5; // Further reduced spacing between bars
    const totalSpacing = (data.length - 1) * barSpacing;
    const availableWidth = chartWidth - 30; // Leave 15px margin on each side
    const barWidth = data.length > 0 ? Math.max(16, (availableWidth - totalSpacing) / data.length) : 16;

    const renderBars = () => {
        return data.map((value, index) => {
            const barHeight = animatedValues[index].interpolate({
                inputRange: [0, maxValue],
                outputRange: [0, chartHeight],
                extrapolate: 'clamp',
            });

            const barLeft = 15 + index * (barWidth + barSpacing); // Start with 15px margin (moved right)
            const colorIndex = index % colors.length;

            return (
                <View key={index} style={[styles.barContainer, { left: barLeft, width: barWidth }]}>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                height: barHeight,
                                width: barWidth,
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={[colors[colorIndex], `${colors[colorIndex]}80`]}
                            style={styles.barGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        />
                    </Animated.View>
                </View>
            );
        });
    };

    const renderBarValues = () => {
        return data.map((value, index) => {
            const valueLeft = 5 + index * (barWidth + barSpacing) + (barWidth / 2) - 12; // Center values under bars
            return (
                <Animated.Text
                    key={index}
                    style={[
                        styles.barValue,
                        {
                            left: valueLeft,
                            opacity: animatedValues[index].interpolate({
                                inputRange: [0, maxValue],
                                outputRange: [0, 1],
                            }),
                        }
                    ]}
                >
                    {Math.round(value)}
                </Animated.Text>
            );
        });
    };

    const renderLabels = () => {
        return labels.map((label, index) => {
            const labelLeft = 5 + index * (barWidth + barSpacing) + (barWidth / 2) - 20; // Center labels under bars
            return (
                <Text
                    key={index}
                    style={[styles.barLabel, { left: labelLeft }]}
                    numberOfLines={1}
                >
                    {label}
                </Text>
            );
        });
    };

    const renderYAxisLabels = () => {
        const labelCount = 5;
        const labels = [];

        for (let i = 0; i <= labelCount; i++) {
            const value = (maxValue * i) / labelCount;
            const top = chartHeight - (i / labelCount) * chartHeight - 8;

            labels.push(
                <Text key={i} style={[styles.yAxisLabel, { top }]}>
                    {Math.round(value)}
                </Text>
            );
        }

        return labels;
    };

    const renderGridLines = () => {
        const lines = [];
        for (let i = 0; i <= 4; i++) {
            const top = (i / 4) * chartHeight;
            lines.push(
                <View
                    key={i}
                    style={[
                        styles.gridLine,
                        {
                            top,
                            width: chartWidth,
                        },
                    ]}
                />
            );
        }
        return lines;
    };

    return (
        <View style={[styles.container, { height }]}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.chartContainer}>
                <View style={[styles.yAxis, { height: chartHeight }]}>
                    {renderYAxisLabels()}
                </View>

                <View style={[styles.chart, { width: chartWidth, height: chartHeight }]}>
                    {renderGridLines()}
                    {renderBars()}
                </View>
            </View>

            {/* Bar Values below the chart */}
            <View style={[styles.valuesContainer, { width: chartWidth, marginLeft: 40 }]}>
                {renderBarValues()}
            </View>

            {/* Labels at the bottom */}
            <View style={[styles.labelsContainer, { width: chartWidth, marginLeft: 40 }]}>
                {renderLabels()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        // padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        overflow: 'hidden', // Prevent any overflow from container
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start', // Align to start for better control
        // paddingHorizontal: 2, // Minimal padding
    },
    yAxis: {
        width: 30,
        justifyContent: 'space-between',
        position: 'relative',
    },
    yAxisLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        position: 'absolute',
        right: 5,
    },
    chart: {
        position: 'relative',
        // marginLeft: 5,
        alignSelf: 'flex-start', // Align to start for better positioning
        overflow: 'hidden', // Prevent overflow
    },
    gridLine: {
        position: 'absolute',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    barContainer: {
        position: 'absolute',
        bottom: 0, // Align bars with the bottom (0 line)
        alignItems: 'center',
        justifyContent: 'flex-end', // Align bars to bottom
    },
    bar: {
        borderRadius: 6,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    barGradient: {
        flex: 1,
        borderRadius: 6,
    },
    barValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'absolute',
        width: 24, // Increased width for better centering
    },
    valuesContainer: {
        position: 'relative',
        height: 20,
        marginTop: 5,
    },
    barLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        position: 'absolute',
        width: 40, // Reduced width for better centering
    },
    labelsContainer: {
        position: 'relative',
        height: 20,
        marginTop: 10,
    },
});

export default BarChart;