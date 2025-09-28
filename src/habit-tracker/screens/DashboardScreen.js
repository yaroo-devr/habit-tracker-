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
import CircularProgress from '../components/CircularProgress';
import StreakTracker from '../components/StreakTracker';

const { width, height } = Dimensions.get('window');

const DashboardScreen = () => {
  const [habits] = useState([
    { id: 1, name: 'Morning Exercise', progress: 85, streak: 12, target: 30 },
    { id: 2, name: 'Read 30 Minutes', progress: 92, streak: 8, target: 21 },
    { id: 3, name: 'Meditation', progress: 67, streak: 5, target: 14 },
  ]);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMotivationalMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! Let's make today count! 🌅";
    if (hour < 17) return "Keep up the momentum! 🚀";
    return "Evening reflection time! 🌙";
  };

  const calculateOverallProgress = () => {
    const total = habits.reduce((sum, habit) => sum + habit.progress, 0);
    return Math.round(total / habits.length);
  };

  const renderHabitCard = (habit) => (
    <TouchableOpacity key={habit.id} style={styles.habitCard}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.habitCardGradient}
      >
        <View style={styles.habitCardContent}>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{habit.name}</Text>
            <Text style={styles.habitStreak}>{habit.streak} day streak</Text>
          </View>
          <CircularProgress
            progress={habit.progress}
            size={60}
            strokeWidth={4}
            colors={['#FF6B6B', '#4ECDC4']}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
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
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{getMotivationalMessage()}</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</Text>
          </View>

          {/* Overall Progress */}
          <View style={styles.overallProgressSection}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <View style={styles.progressContainer}>
              <CircularProgress
                progress={calculateOverallProgress()}
                size={140}
                strokeWidth={10}
                title="Overall"
                subtitle="Progress"
                colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
              />
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{habits.length}</Text>
                  <Text style={styles.statLabel}>Active Habits</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{Math.max(...habits.map(h => h.streak))}</Text>
                  <Text style={styles.statLabel}>Best Streak</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Streak Tracker */}
          <StreakTracker
            streakCount={12}
            targetDays={30}
          />

          {/* Habits List */}
          <View style={styles.habitsSection}>
            <Text style={styles.sectionTitle}>Your Habits</Text>
            {habits.map(renderHabitCard)}
          </View>

          {/* Quick Actions */}
          {/* <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.actionButtonGradient}
              >
                <Text style={styles.actionButtonText}>Add Habit</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.actionButtonGradient}
              >
                <Text style={styles.actionButtonText}>View Analytics</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  overallProgressSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  habitsSection: {
    marginBottom: 30,
  },
  habitCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  habitCardGradient: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  habitCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  habitStreak: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;