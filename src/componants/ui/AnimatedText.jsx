import React, { useEffect, useState } from 'react';

const AnimatedText = ({ text, className = '' }) => {
  const [animatedLetters, setAnimatedLetters] = useState([]);

  useEffect(() => {
    const letters = text.split('');
    const newAnimatedLetters = letters.map((letter, index) => ({
      letter,
      delay: index * 100, // Stagger animation by 100ms per letter
    }));

    setAnimatedLetters(newAnimatedLetters);

    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimatedLetters(prev =>
        prev.map(item => ({ ...item, animate: true }))
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className={`animated-text ${className}`}>
      {animatedLetters.map((item, index) => (
        <span
          key={index}
          className={`letter ${item.animate ? 'animate' : ''}`}
          style={{ animationDelay: `${item.delay}ms` }}
        >
          {item.letter === ' ' ? '\u00A0' : item.letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
