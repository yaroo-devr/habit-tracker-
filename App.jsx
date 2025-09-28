import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Import habit tracker screens
import { DashboardScreen, AddHabitScreen, AnalyticsScreen } from './src/habit-tracker';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const TabButton = ({ title, screenKey, icon }) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => setCurrentScreen(screenKey)}
    >
      <LinearGradient
        colors={currentScreen === screenKey
          ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']
          : ['transparent', 'transparent']
        }
        style={styles.tabButtonGradient}
      >
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[
          styles.tabText,
          currentScreen === screenKey && styles.activeTabText
        ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Main Content - This will take remaining space */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Add Habit Modal */}
      <AddHabitScreen
        visible={showAddHabit}
        onClose={() => setShowAddHabit(false)}
      />

      {/* Bottom Navigation - Fixed height at bottom */}
      <View style={styles.bottomNavWrapper}>
        <LinearGradient
          colors={['rgba(103, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
          style={styles.bottomNav}
        >
          <View style={styles.tabContainer}>
            <TabButton
              title="Dashboard"
              screenKey="dashboard"
              icon="🏠"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddHabit(true)}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.addButtonGradient}
              >
                <Text style={styles.addButtonText}>+</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TabButton
              title="Analytics"
              screenKey="analytics"
              icon="📊"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingTop: StatusBar.currentHeight || 0, // Handle status bar height
  },
  content: {
    flex: 1, // Takes all available space except bottom nav
  },
  bottomNavWrapper: {
    // Fixed height container for bottom navigation
  },
  bottomNav: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingBottom:
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginHorizontal: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default App;