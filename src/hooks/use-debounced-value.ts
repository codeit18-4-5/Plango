import { useState, useEffect } from "react";

/**
 * 디바운스된 값 반환 훅
 * @param value
 * @param delay 지연 시간
 */
const useDebouncedValue = <T>(value: T, delay = 200): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

export default useDebouncedValue;
