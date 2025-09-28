import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AISuggestions from '../components/AISuggestions';

const { width, height } = Dimensions.get('window');

const AddHabitScreen = ({ visible = true, onClose = () => { } }) => {
    const [habitName, setHabitName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState('daily');
    const [description, setDescription] = useState('');
    const [showAISuggestions, setShowAISuggestions] = useState(false);

    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const categories = [
        { id: 'health', name: 'Health', icon: '🏥', color: ['#4ECDC4', '#44A08D'] },
        { id: 'fitness', name: 'Fitness', icon: '💪', color: ['#FF6B6B', '#EE5A52'] },
        { id: 'learning', name: 'Learning', icon: '📚', color: ['#4A90E2', '#357ABD'] },
        { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️', color: ['#9B59B6', '#8E44AD'] },
        { id: 'productivity', name: 'Productivity', icon: '⚡', color: ['#FFD93D', '#FF9800'] },
    ];

    const frequencies = ['daily', 'weekly', 'monthly'];

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: height,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleAddHabit = () => {
        if (!habitName.trim()) return;

        const habitData = {
            name: habitName,
            category: selectedCategory,
            frequency: selectedFrequency,
            description: description,
            createdAt: new Date().toISOString(),
        };

        console.log('Adding habit:', habitData);
        // Here you would typically save to your state management or API

        // Reset form
        setHabitName('');
        setSelectedCategory('');
        setDescription('');
        onClose();
    };

    const handleSuggestionSelect = (suggestion) => {
        setHabitName(suggestion.title);
        setDescription(suggestion.description);
        setSelectedCategory(suggestion.category);
        setShowAISuggestions(false);
    };

    const renderCategoryItem = (category) => (
        <TouchableOpacity
            key={category.id}
            style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
        >
            <LinearGradient
                colors={selectedCategory === category.id ? category.color : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.categoryGradient}
            >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                    {category.name}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderFrequencyItem = (frequency) => (
        <TouchableOpacity
            key={frequency}
            style={[
                styles.frequencyItem,
                selectedFrequency === frequency && styles.selectedFrequency,
            ]}
            onPress={() => setSelectedFrequency(frequency)}
        >
            <Text style={[
                styles.frequencyText,
                selectedFrequency === frequency && styles.selectedFrequencyText
            ]}>
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
            </Text>
        </TouchableOpacity>
    );

    if (showAISuggestions) {
        return (
            <Modal visible={visible} animationType="none" transparent>
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <LinearGradient
                            colors={['#667eea', '#764ba2', '#f093fb']}
                            style={styles.gradient}
                        >
                            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setShowAISuggestions(false)} style={styles.backButton}>
                                    <Text style={styles.backButtonText}>← Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <AISuggestions onSelectSuggestion={handleSuggestionSelect} />
                        </LinearGradient>
                    </Animated.View>
                </Animated.View>
            </Modal>
        );
    }

    return (
        <Modal visible={visible} animationType="none" transparent>
            <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <LinearGradient
                        colors={['#667eea', '#764ba2', '#f093fb']}
                        style={styles.gradient}
                    >
                        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                        <KeyboardAvoidingView
                            style={styles.keyboardAvoid}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                                {/* Header */}
                                <View style={styles.modalHeader}>
                                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Create New Habit</Text>
                                    <Text style={styles.subtitle}>Build better habits, one step at a time</Text>

                                    {/* AI Suggestions Button */}
                                    <TouchableOpacity
                                        style={styles.aiButton}
                                        onPress={() => setShowAISuggestions(true)}
                                    >
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                                            style={styles.aiButtonGradient}
                                        >
                                            <Text style={styles.aiButtonIcon}>✨</Text>
                                            <Text style={styles.aiButtonText}>Get AI Suggestions</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    {/* Habit Name Input */}
                                    <View style={styles.inputSection}>
                                        <Text style={styles.label}>Habit Name</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                value={habitName}
                                                onChangeText={setHabitName}
                                                placeholder="Enter habit name..."
                                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                            />
                                        </View>
                                    </View>

                                    {/* Description Input */}
                                    <View style={styles.inputSection}>
                                        <Text style={styles.label}>Description (Optional)</Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={[styles.input, styles.textArea]}
                                                value={description}
                                                onChangeText={setDescription}
                                                placeholder="Describe your habit..."
                                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                                multiline
                                                numberOfLines={3}
                                            />
                                        </View>
                                    </View>

                                    {/* Category Selection */}
                                    <View style={styles.inputSection}>
                                        <Text style={styles.label}>Category</Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                                            {categories.map(renderCategoryItem)}
                                        </ScrollView>
                                    </View>

                                    {/* Frequency Selection */}
                                    <View style={styles.inputSection}>
                                        <Text style={styles.label}>Frequency</Text>
                                        <View style={styles.frequencyContainer}>
                                            {frequencies.map(renderFrequencyItem)}
                                        </View>
                                    </View>

                                    {/* Create Button */}
                                    <TouchableOpacity
                                        style={[styles.createButton, !habitName.trim() && styles.disabledButton]}
                                        onPress={handleAddHabit}
                                        disabled={!habitName.trim()}
                                    >
                                        <LinearGradient
                                            colors={habitName.trim() ? ['#FF6B6B', '#FF8E53'] : ['#666', '#555']}
                                            style={styles.createButtonGradient}
                                        >
                                            <Text style={styles.createButtonText}>Create Habit</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </LinearGradient>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        flex: 1,
        marginTop: height * 0.1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight + 20,
        paddingBottom: 10,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
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
        marginBottom: 30,
    },
    aiButton: {
        marginBottom: 30,
        borderRadius: 16,
        overflow: 'hidden',
    },
    aiButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    aiButtonIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    aiButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    inputSection: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    inputContainer: {
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    categoriesContainer: {
        flexDirection: 'row',
    },
    categoryItem: {
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    categoryGradient: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        minWidth: 80,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    selectedCategory: {
        transform: [{ scale: 1.05 }],
    },
    categoryIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    categoryText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    frequencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    frequencyItem: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    selectedFrequency: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    frequencyText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedFrequencyText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    createButton: {
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    disabledButton: {
        opacity: 0.6,
    },
    createButtonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default AddHabitScreen;