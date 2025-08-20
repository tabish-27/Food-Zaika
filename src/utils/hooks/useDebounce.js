import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * @param {any} value The value to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {any} The debounced value.
 */
const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timer if value or delay changes
    // or if the component unmounts. This is crucial for performance.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;