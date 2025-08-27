import { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Styles } from '../styles/GlobalStyles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export default function Button({
  onPress,
  title,
  isBlue,
  isGray,
}: ButtonProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={
        isBlue
          ? Styles.btnBlue
          : isGray
          ? Styles.btnGray
          : theme === 'light'
          ? Styles.btnLight
          : Styles.btnDark
      }
      onPress={onPress}
    >
      <Text
        style={
          isBlue
            ? Styles.smallTextLight
            : isGray
            ? Styles.smallTextLight
            : theme === 'light'
            ? Styles.smallTextLight
            : Styles.smallTextDark
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
