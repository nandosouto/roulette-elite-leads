
import { useState, useEffect } from 'react';

interface CountdownProps {
  initialMinutes: number;
  initialSeconds: number;
}

export function useCountdown({ initialMinutes, initialSeconds }: CountdownProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(interval);
          setIsRunning(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, isRunning]);

  // Format to always have two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return { 
    formattedMinutes, 
    formattedSeconds, 
    isRunning, 
    minutes, 
    seconds 
  };
}
