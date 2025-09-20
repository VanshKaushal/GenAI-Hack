import React, { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import PixelBlast from './PixelBlast';

const AnimatedBackground = () => {
  const [showPixelBlast, setShowPixelBlast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPixelBlast(true);
    }, 2000); // Switch after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    // UPDATED: All positioning and z-index classes have been removed.
    // The portal now controls its position and layering.
    <div className="w-full h-full bg-gray-900">
      {showPixelBlast ? (
        <PixelBlast
          variant="circle"
          color="#B19EEF"
          pixelSize={4}
          patternDensity={0.8}
          liquid={true}
          liquidStrength={0.15}
          liquidRadius={1.2}
          rippleSpeed={0.4}
        />
      ) : (
        <ParticleBackground />
      )}
    </div>
  );
};

export default AnimatedBackground;
