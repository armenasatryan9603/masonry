import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a search query.
 * @param value The input value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
