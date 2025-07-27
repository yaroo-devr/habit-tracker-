// Calculator utility functions

/**
 * Performs mathematical operations
 * @param {number} firstValue - First operand
 * @param {number} secondValue - Second operand
 * @param {string} operation - Operation to perform (+, -, ×, ÷)
 * @returns {number} Result of the operation
 */
export const performCalculation = (firstValue, secondValue, operation) => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      return secondValue !== 0 ? firstValue / secondValue : 0;
    default:
      return secondValue;
  }
};

/**
 * Formats display value to handle long numbers
 * @param {string} value - Value to format
 * @returns {string} Formatted value
 */
export const formatDisplayValue = (value) => {
  const num = parseFloat(value);

  // Handle very large numbers with scientific notation
  if (Math.abs(num) >= 1e9) {
    return num.toExponential(3);
  }

  // Handle decimal places (limit to 8 decimal places)
  if (value.includes('.')) {
    const parts = value.split('.');
    if (parts[1].length > 8) {
      return parseFloat(value).toFixed(8).replace(/\.?0+$/, '');
    }
  }

  return value;
};

/**
 * Validates if a string is a valid number
 * @param {string} value - Value to validate
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Handles number input logic
 * @param {string} currentDisplay - Current display value
 * @param {string} newDigit - New digit to add
 * @param {boolean} waitingForNewValue - Whether waiting for new value
 * @returns {string} New display value
 */
export const handleNumberInput = (currentDisplay, newDigit, waitingForNewValue) => {
  if (waitingForNewValue) {
    return String(newDigit);
  }

  if (currentDisplay === '0') {
    return String(newDigit);
  }

  return currentDisplay + newDigit;
};

/**
 * Handles decimal point input
 * @param {string} currentDisplay - Current display value
 * @returns {string} New display value with decimal point
 */
export const handleDecimalInput = (currentDisplay) => {
  if (currentDisplay.indexOf('.') === -1) {
    return currentDisplay + '.';
  }
  return currentDisplay;
};
