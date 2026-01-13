import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const AnimatedCountUp = ({ end, suffix = '+', duration = 2, ...props }) => {
  const [key, setKey] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKey(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <span ref={ref}>
      <CountUp
        key={key}
        start={0}
        end={end}
        duration={duration}
        suffix={suffix}
        {...props}
      />
    </span>
  );
};

export default AnimatedCountUp;
