import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface LoaderProps {
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 40, 
  color = '#FF6B00' 
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const dotScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  useEffect(() => {
    // Rotating animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing dots animation
    const dotAnimations = dotScales.map((scale, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(scale, {
            toValue: 1.3,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      );
    });

    Animated.stagger(100, dotAnimations).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dotPositions = [
    { angle: 0 },
    { angle: 45 },
    { angle: 90 },
    { angle: 135 },
    { angle: 180 },
    { angle: 225 },
    { angle: 270 },
    { angle: 315 },
  ];

  const radius = size / 2;

  return (
    <Animated.View style={[styles.container, { width: size, height: size, transform: [{ rotate: spin }] }]}>
      {dotPositions.map((pos, index) => {
        const x = radius + (radius - 6) * Math.cos((pos.angle * Math.PI) / 180);
        const y = radius + (radius - 6) * Math.sin((pos.angle * Math.PI) / 180);
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: color,
                left: x - 4,
                top: y - 4,
                transform: [{ scale: dotScales[index] }],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
