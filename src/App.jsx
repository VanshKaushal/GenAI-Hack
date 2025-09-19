import React, { useState, useEffect, useRef } from 'react';

// Import Components
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'signIn', 'signUp', or null

  // Refs for smooth scrolling
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const faqRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll animations
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
      <div className="bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 antialiased transition-colors duration-300">
        <ParticleBackground />

        <div className="relative z-10">
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




