// Habit Tracker Module Main Export
export * from './components';
export * from './screens';

// Utils and Constants (for future expansion)
export const HABIT_CATEGORIES = [
    { id: 'health', name: 'Health', icon: '🏥', color: ['#4ECDC4', '#44A08D'] },
    { id: 'fitness', name: 'Fitness', icon: '💪', color: ['#FF6B6B', '#EE5A52'] },
    { id: 'learning', name: 'Learning', icon: '📚', color: ['#4A90E2', '#357ABD'] },
    { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️', color: ['#9B59B6', '#8E44AD'] },
    { id: 'productivity', name: 'Productivity', icon: '⚡', color: ['#FFD93D', '#FF9800'] },
];

export const HABIT_FREQUENCIES = ['daily', 'weekly', 'monthly'];

export const THEME_COLORS = {
    primary: ['#667eea', '#764ba2'],
    secondary: ['#f093fb', '#f5576c'],
    success: ['#4ECDC4', '#44A08D'],
    warning: ['#FFD93D', '#FF9800'],
    danger: ['#FF6B6B', '#EE5A52'],
    info: ['#4A90E2', '#357ABD'],
};