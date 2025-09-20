
import React, { useState, useEffect, useRef } from 'react';

// Import Components
import PixelBlast from './components/PixelBlast'; // We will use this directly
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navLinks = [
    { name: 'Features', ref: featuresRef },
    { name: 'About', ref: aboutRef },
    { name: 'FAQ', ref: faqRef },
  ];

  return (
    <ThemeProvider>
      {/* This main div should NOT have a background color. */}
      <div className="bg-transparent font-sans text-slate-800 dark:text-slate-200 antialiased transition-colors duration-300">
        
        {/* Layer 1: The Background */}
        {/* This div is fixed to the viewport and sits behind everything. */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gray-900">
          <PixelBlast
            variant="circle"
            color="#B19EEF"
            pixelSize={4}       // Bigger pixels
            patternDensity={1.5}  // Denser pattern
            liquid={true}
            liquidStrength={0.15}
            liquidRadius={1.2}
            rippleSpeed={0.4}
          />
        </div>

        {/* Layer 2: Your Content */}
        {/* This div sits on top of the background. */}
        <div className="relative z-0">
          <Header
            navLinks={navLinks}
            scrollToSection={scrollToSection}
            onSignIn={() => setActiveModal('signIn')}
            onSignUp={() => setActiveModal('signUp')}
          />
          <HeroSection />
          <FeaturesSection ref={featuresRef} />
          <AboutSection ref={aboutRef} />
          <FAQSection ref={faqRef} />
          <Footer />
          
          {activeModal && (
            <Modal type={activeModal} onClose={() => setActiveModal(null)} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}












