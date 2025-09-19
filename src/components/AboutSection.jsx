import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VariableProximity from './VariableProximity';

const AboutSection = React.forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [allLinesVisible, setAllLinesVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const aboutPoints = [
    "To provide an accessible, judgment-free companion for mental wellness.",
    "To destigmatize mental health conversations through technology.",
    "To empower individuals with tools to understand and manage their emotional well-being.",
  ];

  // Sequential animation for lines
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      if (currentLineIndex < aboutPoints.length - 1) {
        setCurrentLineIndex(prev => prev + 1);
      } else {
        setAllLinesVisible(true);
        setIsAnimating(false);
      }
    }, 200); // Delay between each line

    return () => clearTimeout(timer);
  }, [currentLineIndex, isAnimating, aboutPoints.length]);

  // Start animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating && !allLinesVisible) {
          setIsAnimating(true);
          setCurrentLineIndex(0);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimating, allLinesVisible]);

  // Scroll pinning effect
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 0, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.section 
      ref={ref} 
      className="py-20 bg-slate-50 dark:bg-slate-800 section-animate transition-colors duration-300 relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div ref={containerRef} className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h3 
            className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200 transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Mission
          </motion.h3>
          <motion.p 
            className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We believe everyone deserves a safe space to explore their feelings and build mental resilience. mAItri was created with a simple yet profound goal:
          </motion.p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ul className="space-y-6">
            {aboutPoints.map((point, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: index <= currentLineIndex ? 1 : 0,
                  x: index <= currentLineIndex ? 0 : -50
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                <ShieldCheck className="text-sky-500 mr-4 mt-1 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
                  {allLinesVisible ? (
                    <VariableProximity
                      label={point}
                      fromFontVariationSettings="'wght' 400, 'wdth' 100"
                      toFontVariationSettings="'wght' 700, 'wdth' 125"
                      containerRef={containerRef}
                      radius={80}
                      falloff="gaussian"
                      className="text-lg leading-relaxed"
                    />
                  ) : (
                    point
                  )}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
});

export default AboutSection;

