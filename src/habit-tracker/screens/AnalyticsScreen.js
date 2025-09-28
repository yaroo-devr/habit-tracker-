import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import CircularProgress from '../components/CircularProgress';

const { width, height } = Dimensions.get('window');

const AnalyticsScreen = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [fadeAnim] = useState(new Animated.Value(0));

    // Sample data - in a real app, this would come from your state management
    const [weeklyData] = useState([65, 78, 82, 70, 85, 92, 88]);
    const [monthlyData] = useState([75, 82, 68, 90, 85, 78, 92, 88, 76, 80, 85, 89]);
    const [habitCompletionData] = useState([85, 92, 78, 65, 88]);
    const [habitLabels] = useState(['Exercise', 'Reading', 'Meditation', 'Water', 'Sleep']);

    const periods = [
        { id: 'week', label: 'Week', data: weeklyData },
        { id: 'month', label: 'Month', data: monthlyData },
        { id: 'year', label: 'Year', data: [78, 82, 85, 80, 88, 92, 89, 85, 78, 82, 85, 90] },
    ];

    const stats = [
        { title: 'Completion Rate', value: '87%', subtitle: 'This week', color: ['#4ECDC4', '#44A08D'] },
        { title: 'Longest Streak', value: '23', subtitle: 'Days', color: ['#FF6B6B', '#EE5A52'] },
        { title: 'Total Habits', value: '5', subtitle: 'Active', color: ['#45B7D1', '#357ABD'] },
    ];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const getCurrentData = () => {
        return periods.find(p => p.id === selectedPeriod)?.data || [];
    };

    const renderPeriodSelector = () => (
        <View style={styles.periodSelector}>
            {periods.map((period) => (
                <TouchableOpacity
                    key={period.id}
                    style={[
                        styles.periodButton,
                        selectedPeriod === period.id && styles.selectedPeriodButton,
                    ]}
                    onPress={() => setSelectedPeriod(period.id)}
                >
                    <LinearGradient
                        colors={selectedPeriod === period.id
                            ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']
                            : ['transparent', 'transparent']
                        }
                        style={styles.periodButtonGradient}
                    >
                        <Text style={[
                            styles.periodButtonText,
                            selectedPeriod === period.id && styles.selectedPeriodText,
                        ]}>
                            {period.label}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderStatCard = (stat, index) => (
        <View key={index} style={styles.statCard}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.statCardGradient}
            >
                <View style={styles.statContent}>
                    <CircularProgress
                        progress={parseInt(stat.value)}
                        size={60}
                        strokeWidth={4}
                        colors={stat.color}
                    />
                    <View style={styles.statInfo}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statTitle}>{stat.title}</Text>
                        <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    const renderInsightCard = (title, description, icon) => (
        <View style={styles.insightCard}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.insightGradient}
            >
                <View style={styles.insightContent}>
                    <Text style={styles.insightIcon}>{icon}</Text>
                    <View style={styles.insightText}>
                        <Text style={styles.insightTitle}>{title}</Text>
                        <Text style={styles.insightDescription}>{description}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#667eea', '#764ba2', '#f093fb']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Animated.ScrollView
                    style={[styles.scrollView, { opacity: fadeAnim }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Analytics</Text>
                        <Text style={styles.subtitle}>Track your progress and insights</Text>
                    </View>

                    {/* Period Selector */}
                    {renderPeriodSelector()}

                    {/* Stats Overview */}
                    <View style={styles.statsSection}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.statsContainer}
                        >
                            {stats.map(renderStatCard)}
                        </ScrollView>
                    </View>

                    {/* Progress Trend */}
                    <View style={styles.chartSection}>
                        <Text style={styles.sectionTitle}>Progress Trend</Text>
                        <View style={styles.chartWrapper}>
                            <LineChart
                                data={getCurrentData()}
                                title={`${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}ly Progress`}
                                height={220}
                                colors={['#4ECDC4', '#44A08D']}
                            />
                        </View>
                    </View>

                    {/* Habit Completion */}
                    <View style={styles.chartSection}>
                        <Text style={styles.sectionTitle}>Habit Completion Rate</Text>
                        <View style={styles.habitChartWrapper}>
                            <BarChart
                                data={habitCompletionData}
                                labels={habitLabels}
                                title="This Week's Performance"
                                height={240}
                                colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']}
                            />
                        </View>
                    </View>

                    {/* Insights */}
                    <View style={styles.insightsSection}>
                        <Text style={styles.sectionTitle}>Insights</Text>

                        {renderInsightCard(
                            'Great Consistency!',
                            'You\'ve maintained an 87% completion rate this week. Keep up the excellent work!',
                            '🎯'
                        )}

                        {renderInsightCard(
                            'Best Performance Day',
                            'Fridays are your strongest days with 95% completion rate.',
                            '📈'
                        )}

                        {renderInsightCard(
                            'Improvement Opportunity',
                            'Consider setting reminders for meditation habits - 23% improvement potential.',
                            '💡'
                        )}
                    </View>

                    {/* Weekly Summary */}
                    <View style={styles.summarySection}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                            style={styles.summaryCard}
                        >
                            <Text style={styles.summaryTitle}>Weekly Summary</Text>
                            <View style={styles.summaryStats}>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryNumber}>32</Text>
                                    <Text style={styles.summaryLabel}>Habits Completed</Text>
                                </View>
                                <View style={styles.summaryDivider} />
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryNumber}>5.2</Text>
                                    <Text style={styles.summaryLabel}>Avg per Day</Text>
                                </View>
                                <View style={styles.summaryDivider} />
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryNumber}>23</Text>
                                    <Text style={styles.summaryLabel}>Current Streak</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </Animated.ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingTop: 20, // Reduced since status bar handled in App.jsx
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    periodSelector: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 4,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    periodButton: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    selectedPeriodButton: {
        // elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    periodButtonGradient: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    periodButtonText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedPeriodText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    statsSection: {
        marginBottom: 30,
    },
    statsContainer: {
        flexDirection: 'row',
    },
    statCard: {
        width: 160,
        height: 120, // Fixed height for consistency
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    statCardGradient: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        height: '100%', // Ensure full height
        justifyContent: 'center', // Center content vertically
    },
    statContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Better spacing
    },
    statInfo: {
        marginLeft: 12,
        flex: 1,
        alignItems: 'center', // Center align text
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    statTitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    statSubtitle: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 1,
    },
    chartSection: {
        marginBottom: 30,
        paddingHorizontal: 5, // Add horizontal padding to contain charts
    },
    chartWrapper: {
        overflow: 'hidden', // Ensure content doesn't overflow
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 10,
    },
    habitChartWrapper: {
        overflow: 'hidden', // Ensure content doesn't overflow
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 10,
    },
    insightsSection: {
        marginBottom: 30,
    },
    insightCard: {
        marginBottom: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    insightGradient: {
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    insightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insightIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    insightText: {
        flex: 1,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    insightDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 20,
    },
    summarySection: {
        marginBottom: 30,
    },
    summaryCard: {
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    summaryStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    summaryLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
        textAlign: 'center',
    },
    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 16,
    },
});

export default AnalyticsScreen;