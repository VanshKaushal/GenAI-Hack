

import React from 'react';
import MorphingText from './MorphingText';
import CurvedLoop from './CurvedLoop';
import TextType from './TextType';
import GlareHover from './GlareHover';

const HeroSection = () => {
  const supportivePhrases = [
    "I'm here for you, no matter what.",
    "It's okay to feel that way.",
    "You're safe in this moment.",
    "This feeling is temporary.",
    "I believe in you.",
  ];

  return (
    <main className="h-screen flex flex-col justify-center items-center text-center px-6 pt-16 overflow-hidden">
      
      {/* Curved text headline */}
      <div className="w-full max-w-6xl -mt-16 mb-4">
        <CurvedLoop
          marqueeText="Find your calm with PeacePulse"
          highlightText="PeacePulse"
          highlightClassName="text-sky-400"
          speed={1.5}
          className="text-white font-extrabold text-5xl md:text-7xl"
          curveAmount={400}
          interactive={false}
        />
      </div>

      {/* Animated Subtitle using TextType */}
      <div className="animate-fade-in-up max-w-2xl mx-auto mt-4" style={{ animationDelay: '0.5s' }}>
        <TextType
          as="p"
          text="Your personal AI companion for mental wellness, here to listen and support you 24/7."
          typingSpeed={40}
          loop={false}
          showCursor={true}
          cursorCharacter="_"
          className="text-xl md:text-2xl text-slate-300 transition-colors duration-300"
        />
      </div>
      
      {/* Morphing supportive text */}
      <div className="mt-8 animate-fade-in-up bg-white/10 backdrop-blur-sm rounded-2xl p-6" style={{ animationDelay: '1s' }}>
        <MorphingText 
          texts={supportivePhrases}
          className="text-xl md:text-2xl text-sky-300 font-semibold italic"
          duration={3000}
        />
      </div>
      
      {/* --- Start Journey Button with Glare Effect --- */}
      <div className="w-full flex justify-center mt-16">
        <GlareHover
          background="rgba(2, 132, 199, 1)" // Explicitly set the background color
          glareColor="#a7ddf5"
          glareOpacity={0.9}
          glareSize={400}
           transitionDuration={700}
          className="text-white rounded-full text-lg font-sans transition-all duration-300 hover:bg-sky-600"
        >
          <a 
          // link to the project page
            href="#" 
            className="block px-8 py-4"
          >
            Start Your Journey
          </a>
        </GlareHover>
      </div>

    </main>
  );
};

export default HeroSection;












