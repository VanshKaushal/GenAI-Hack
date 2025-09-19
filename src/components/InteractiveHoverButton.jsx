import React, { useState, useRef,  } from 'react';

const InteractiveHoverButton = ({ 
  children, 
  className = "", 
  onClick,
  variant = "default" // "default", "primary", "secondary"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          base: "bg-sky-500 text-white border-sky-500",
          hover: "bg-sky-600 border-sky-600 shadow-lg shadow-sky-500/25",
          glow: "shadow-sky-500/50"
        };
      case "secondary":
        return {
          base: "bg-slate-800 text-white border-slate-800",
          hover: "bg-slate-900 border-slate-900 shadow-lg shadow-slate-800/25",
          glow: "shadow-slate-800/50"
        };
      default:
        return {
          base: "bg-transparent text-slate-600 dark:text-slate-300 border-transparent",
          hover: "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 shadow-lg shadow-slate-500/25",
          glow: "shadow-slate-500/50"
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden px-4 py-2 rounded-full font-medium
        border-2 transition-all duration-500 ease-out
        ${variantStyles.base}
        ${isHovered ? variantStyles.hover : ''}
        ${className}
      `}
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Background glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
      )}
      
      {/* Text with smooth transition */}
      <span className="relative z-10 transition-all duration-300">
        {children}
      </span>
      
      {/* Border glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-500"
          style={{
            boxShadow: `0 0 20px ${variantStyles.glow}`,
          }}
        />
      )}
    </button>
  );
};

export default InteractiveHoverButton;
