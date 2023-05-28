import React, { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebounceValue] = useState('');

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(intervalId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
