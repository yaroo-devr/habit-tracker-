import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AISuggestions = ({ onSelectSuggestion, category = 'general' }) => {
    const [suggestions] = useState([
        {
            id: 1,
            title: 'Morning Meditation',
            description: '10 minutes of mindfulness to start your day',
            category: 'wellness',
            icon: '🧘‍♀️',
            difficulty: 'Easy'
        },
        {
            id: 2,
            title: 'Daily Reading',
            description: 'Read for 30 minutes to expand your knowledge',
            category: 'learning',
            icon: '📚',
            difficulty: 'Medium'
        },
        {
            id: 3,
            title: 'Hydration Goal',
            description: 'Drink 8 glasses of water throughout the day',
            category: 'health',
            icon: '💧',
            difficulty: 'Easy'
        },
        {
            id: 4,
            title: 'Exercise Routine',
            description: '30 minutes of physical activity',
            category: 'fitness',
            icon: '💪',
            difficulty: 'Medium'
        },
        {
            id: 5,
            title: 'Gratitude Journal',
            description: 'Write 3 things you\'re grateful for',
            category: 'wellness',
            icon: '📝',
            difficulty: 'Easy'
        },
        {
            id: 6,
            title: 'Digital Detox',
            description: '1 hour without social media',
            category: 'wellness',
            icon: '📱',
            difficulty: 'Hard'
        },
    ]);

    const [animatedValues] = useState(
        suggestions.map(() => new Animated.Value(0))
    );

    useEffect(() => {
        const animations = animatedValues.map((animatedValue, index) =>
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 600,
                delay: index * 100,
                useNativeDriver: true,
            })
        );

        Animated.stagger(100, animations).start();
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return ['#4ECDC4', '#44A08D'];
            case 'Medium': return ['#FFD93D', '#FF9800'];
            case 'Hard': return ['#FF6B6B', '#EE5A52'];
            default: return ['#9B59B6', '#8E44AD'];
        }
    };

    const renderSuggestion = ({ item, index }) => (
        <Animated.View
            style={[
                styles.suggestionContainer,
                {
                    opacity: animatedValues[index],
                    transform: [
                        {
                            translateY: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <TouchableOpacity
                style={styles.suggestion}
                onPress={() => onSelectSuggestion(item)}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.suggestionGradient}
                >
                    <View style={styles.suggestionHeader}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>{item.icon}</Text>
                        </View>
                        <View style={styles.difficultyBadge}>
                            <LinearGradient
                                colors={getDifficultyColor(item.difficulty)}
                                style={styles.difficultyGradient}
                            >
                                <Text style={styles.difficultyText}>{item.difficulty}</Text>
                            </LinearGradient>
                        </View>
                    </View>

                    <View style={styles.suggestionContent}>
                        <Text style={styles.suggestionTitle}>{item.title}</Text>
                        <Text style={styles.suggestionDescription}>{item.description}</Text>
                    </View>

                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>#{item.category}</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>✨ AI Suggestions</Text>
                <Text style={styles.subtitle}>Personalized habits just for you</Text>
            </View>

            <FlatList
                data={suggestions}
                renderItem={renderSuggestion}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
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
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    suggestionContainer: {
        marginBottom: 16,
    },
    suggestion: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    suggestionGradient: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
    },
    suggestionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 24,
    },
    difficultyBadge: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    difficultyGradient: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    difficultyText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    suggestionContent: {
        marginBottom: 12,
    },
    suggestionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    suggestionDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 20,
    },
    categoryContainer: {
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '500',
    },
});

export default AISuggestions;