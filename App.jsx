import { View, Text, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { ThemeContext } from './src/context/ThemeContext'
import { myColors } from './src/styles/Colors'
import Calculator from './src/components/Calculator'

const App = () => {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <View style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: myColors.dark }]}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />

        {/* Theme Toggle Switch */}
        <View style={styles.switchContainer}>
          <Switch
            value={theme === 'dark'}
            onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            thumbColor={theme === 'dark' ? myColors.blue : myColors.white}
            trackColor={{ false: myColors.gray, true: myColors.blue }}
          />
          <Text style={[styles.switchLabel, { color: theme === 'light' ? myColors.black : myColors.white }]}>
            {theme === 'dark' ? 'Dark' : 'Light'} Mode
          </Text>
        </View>

        {/* Calculator Component */}
        <Calculator />
      </View>
    </ThemeContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
  },
  switchContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  }
});