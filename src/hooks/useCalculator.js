import { useState, useCallback } from 'react';

export const useCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);
    const [activeOperation, setActiveOperation] = useState(null);

    const performCalculation = (firstValue, secondValue, operation) => {
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

    const formatDisplayValue = (value) => {
        const num = parseFloat(value);

        if (Math.abs(num) >= 1e9) {
            return num.toExponential(3);
        }

        if (value.includes('.')) {
            const parts = value.split('.');
            if (parts[1].length > 8) {
                return parseFloat(value).toFixed(8).replace(/\.?0+$/, '');
            }
        }

        return value;
    };

    const handleNumberInput = (currentDisplay, newDigit, waitingForNewValue) => {
        if (waitingForNewValue) {
            return String(newDigit);
        }

        if (currentDisplay === '0') {
            return String(newDigit);
        }

        return currentDisplay + newDigit;
    };

    const handleDecimalInput = (currentDisplay) => {
        if (currentDisplay.indexOf('.') === -1) {
            return currentDisplay + '.';
        }
        return currentDisplay;
    };

    const inputNumber = useCallback((num) => {
        const newDisplay = handleNumberInput(display, num, waitingForNewValue);
        setDisplay(newDisplay);
        setWaitingForNewValue(false);
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
        setActiveOperation(nextOperation);
    }, [display, previousValue, operation]);

    const handleEqual = useCallback(() => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = performCalculation(previousValue, inputValue, operation);
            const formattedValue = formatDisplayValue(String(newValue));

            setDisplay(formattedValue);
            setPreviousValue(null);
            setOperation(null);
            setActiveOperation(null);
            setWaitingForNewValue(true);
        }
    }, [display, previousValue, operation]);

    const handleClear = useCallback(() => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setActiveOperation(null);
        setWaitingForNewValue(false);
    }, []);

    const handlePercentage = useCallback(() => {
        const value = parseFloat(display);
        const newValue = value / 100;
        setDisplay(formatDisplayValue(String(newValue)));
        setActiveOperation(null);
    }, [display]);

    const handlePlusMinus = useCallback(() => {
        const value = parseFloat(display);
        const newValue = value * -1;
        setDisplay(formatDisplayValue(String(newValue)));
        setActiveOperation(null);
    }, [display]);

    const handleDecimal = useCallback(() => {
        const newDisplay = handleDecimalInput(display);
        setDisplay(newDisplay);
        setActiveOperation(null);
    }, [display]);

    return {
        display,
        operation,
        activeOperation,
        inputNumber,
        inputOperation,
        handleEqual,
        handleClear,
        handlePercentage,
        handlePlusMinus,
        handleDecimal,
    };
};