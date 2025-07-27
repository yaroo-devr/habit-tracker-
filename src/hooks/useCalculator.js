import { useState, useCallback } from 'react';
import {
  performCalculation,
  formatDisplayValue,
  handleNumberInput,
  handleDecimalInput
} from '../utils/calculatorUtils';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null); // For visual feedback

  const inputNumber = useCallback((num) => {
    const newDisplay = handleNumberInput(display, num, waitingForNewValue);
    setDisplay(newDisplay);
    setWaitingForNewValue(false);
    // Clear active operation visual feedback when user starts entering a new number
    setActiveOperation(null);
  }, [display, waitingForNewValue]);

  const inputOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);
      const formattedValue = formatDisplayValue(String(newValue));

      setDisplay(formattedValue);
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
    setActiveOperation(nextOperation); // Set visual active state
  }, [display, previousValue, operation]);

  const handleEqual = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      const formattedValue = formatDisplayValue(String(newValue));

      setDisplay(formattedValue);
      setPreviousValue(null);
      setOperation(null);
      setActiveOperation(null); // Clear visual active state
      setWaitingForNewValue(true);
    }
  }, [display, previousValue, operation]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setActiveOperation(null); // Clear visual active state
    setWaitingForNewValue(false);
  }, []);

  const handlePercentage = useCallback(() => {
    const value = parseFloat(display);
    const newValue = value / 100;
    setDisplay(formatDisplayValue(String(newValue)));
    setActiveOperation(null); // Clear visual active state
  }, [display]);

  const handlePlusMinus = useCallback(() => {
    const value = parseFloat(display);
    const newValue = value * -1;
    setDisplay(formatDisplayValue(String(newValue)));
    setActiveOperation(null); // Clear visual active state
  }, [display]);

  const handleDecimal = useCallback(() => {
    const newDisplay = handleDecimalInput(display);
    setDisplay(newDisplay);
    setActiveOperation(null); // Clear visual active state
  }, [display]);

  return {
    display,
    operation,
    activeOperation, // Export the visual active state
    inputNumber,
    inputOperation,
    handleEqual,
    handleClear,
    handlePercentage,
    handlePlusMinus,
    handleDecimal,
  };
};
