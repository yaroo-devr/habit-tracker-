import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const FadeInView = ({
    children,
    duration = 1000,
    delay = 0,
    style = {},
    direction = 'up' // 'up', 'down', 'left', 'right', 'none'
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(getInitialTranslateValue(direction))).current;

    function getInitialTranslateValue(dir) {
        switch (dir) {
            case 'up': return 50;
            case 'down': return -50;
            case 'left': return 50;
            case 'right': return -50;
            default: return 0;
        }
    }

    useEffect(() => {
        const animations = [
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
        ];

        if (direction !== 'none') {
            animations.push(
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration,
                    delay,
                    useNativeDriver: true,
                })
            );
        }

        Animated.parallel(animations).start();
    }, [fadeAnim, translateAnim, duration, delay, direction]);

    const getTransformStyle = () => {
        if (direction === 'none') {
            return {};
        }

        const transformProperty = (direction === 'left' || direction === 'right')
            ? 'translateX'
            : 'translateY';

        return {
            transform: [{ [transformProperty]: translateAnim }],
        };
    };

    return (
        <Animated.View
            style={[
                {
                    opacity: fadeAnim,
                    ...getTransformStyle(),
                },
                style,
            ]}
        >
            {children}
        </Animated.View>
    );
};

export default FadeInView;