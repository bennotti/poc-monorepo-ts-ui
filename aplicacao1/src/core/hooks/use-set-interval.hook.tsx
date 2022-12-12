import { useEffect, useRef } from 'react';

// Code : https://overreacted.io/making-setinterval-declarative-with-react-hooks/

declare type functionType = () => void;

export const useSetInterval = (fn: functionType, delay: number) => {
  const savedFn = useRef<functionType>();

  // Remember the latest callback function.
  useEffect(() => {
    savedFn.current = fn;
  }, [fn]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      (savedFn.current as functionType)();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
