import React, { useState, useEffect, useRef } from 'react';

const HyperText = ({ 
  children, 
  className = "", 
  duration = 800, 
  delay = 0, 
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const scrambleText = (finalText, onComplete) => {
    if (isAnimating || hasAnimated) return;
    
    setIsAnimating(true);
    const finalLength = finalText.length;
    let currentText = finalText;
    let iterations = 0;
    const maxIterations = 15;

    const animate = () => {
      currentText = currentText
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return finalText[index];
          }
          if (char === " ") return " ";
          return characterSet[Math.floor(Math.random() * characterSet.length)];
        })
        .join("");

      setDisplayText(currentText);

      if (iterations >= finalLength) {
        setIsAnimating(false);
        setHasAnimated(true);
        onComplete?.();
        return;
      }

      iterations += 1;
      animationRef.current = setTimeout(animate, duration / maxIterations);
    };

    setTimeout(animate, delay);
  };

  const startAnimation = () => {
    if (startOnView && !hasAnimated) {
      // Run animation once and stop
      scrambleText(children);
    }
  };

  const handleHover = () => {
    if (animateOnHover && !isAnimating && !hasAnimated) {
      setIsHovered(true);
      scrambleText(children);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (startOnView && elementRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isAnimating && !hasAnimated) {
            startAnimation();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [startOnView, children, isAnimating, hasAnimated]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);



  return (
    <Component
      ref={elementRef}
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: animateOnHover ? 'pointer' : 'default' }}
    >
      {displayText}
    </Component>
  );
};

export default HyperText;
