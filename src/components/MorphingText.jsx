import React, { useState, useEffect } from 'react';

const MorphingText = ({ 
  texts = [], 
  className = "",
  duration = 2000, // Time each text is displayed
  transitionDuration = 500 // Time for morphing transition
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState(texts[0] || '');

  useEffect(() => {
    if (texts.length === 0) return;

    const interval = setInterval(() => {
      // Start transition out
      setIsTransitioning(true);
      
      // After transition out, change text and transition in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setDisplayText(texts[(currentIndex + 1) % texts.length]);
        
        // Small delay to ensure text is updated before transition in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, transitionDuration);
    }, duration);

    return () => clearInterval(interval);
  }, [texts, duration, transitionDuration, currentIndex]);

  if (texts.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`transition-all duration-800 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 transform translate-y-4 scale-90' 
            : 'opacity-100 transform translate-y-0 scale-100'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <span className="block text-center">
          {displayText}
        </span>
      </div>
    </div>
  );
};

export default MorphingText;
