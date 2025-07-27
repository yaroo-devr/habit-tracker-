import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useCalculator } from '../hooks/useCalculator';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';

const Calculator = () => {
  const {
    display,
    operation,
    activeOperation, // Use this for visual feedback
    inputNumber,
    inputOperation,
    handleEqual,
    handleClear,
    handlePercentage,
    handlePlusMinus,
    handleDecimal,
  } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Display */}
      <CalculatorDisplay value={display} />

      {/* Button Grid */}
      <View style={styles.buttonContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <CalculatorButton
            title="C"
            onPress={handleClear}
            type="function"
          />
          <CalculatorButton
            title="+/-"
            onPress={handlePlusMinus}
            type="function"
          />
          <CalculatorButton
            title="%"
            onPress={handlePercentage}
            type="function"
          />
          <CalculatorButton
            title="÷"
            onPress={() => inputOperation('÷')}
            type="operator"
            isActive={activeOperation === '÷'}
          />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <CalculatorButton title="7" onPress={() => inputNumber(7)} />
          <CalculatorButton title="8" onPress={() => inputNumber(8)} />
          <CalculatorButton title="9" onPress={() => inputNumber(9)} />
          <CalculatorButton
            title="×"
            onPress={() => inputOperation('×')}
            type="operator"
            isActive={activeOperation === '×'}
          />
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <CalculatorButton title="4" onPress={() => inputNumber(4)} />
          <CalculatorButton title="5" onPress={() => inputNumber(5)} />
          <CalculatorButton title="6" onPress={() => inputNumber(6)} />
          <CalculatorButton
            title="-"
            onPress={() => inputOperation('-')}
            type="operator"
            isActive={activeOperation === '-'}
          />
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <CalculatorButton title="1" onPress={() => inputNumber(1)} />
          <CalculatorButton title="2" onPress={() => inputNumber(2)} />
          <CalculatorButton title="3" onPress={() => inputNumber(3)} />
          <CalculatorButton
            title="+"
            onPress={() => inputOperation('+')}
            type="operator"
            isActive={activeOperation === '+'}
          />
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <CalculatorButton
            title="0"
            onPress={() => inputNumber(0)}
            isWide={true}
          />
          <CalculatorButton title="." onPress={handleDecimal} />
          <CalculatorButton
            title="="
            onPress={handleEqual}
            type="operator"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  buttonContainer: {
    paddingHorizontal: SIZES.spacing.large,
    paddingBottom: SIZES.spacing.large,
  },
  row: {
    flexDirection: 'row',
    marginBottom: SIZES.spacing.medium,
  },
});

export default Calculator;
