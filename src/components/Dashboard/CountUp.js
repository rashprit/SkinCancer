// CountUp.js - Enhanced with better animation
import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000, className = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const endValue = parseInt(end, 10);
          if (start === endValue) return;

          const incrementTime = Math.max(duration / endValue, 20);
          let current = start;

          const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current === endValue) clearInterval(timer);
          }, incrementTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration]);

  return (
    <span ref={countRef} className={`stat-value ${className}`}>
      {count}
    </span>
  );
};

export default CountUp;