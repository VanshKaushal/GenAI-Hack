import React, { useLayoutEffect, useRef } from 'react';
import { MessageSquare, BrainCircuit, ShieldCheck, Heart } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const IconWrapper = ({ children }) => (
  <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 p-3 rounded-full mb-4 transition-colors duration-300">
    {children}
  </div>
);

const FeaturesSection = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  
  const featureCards = [
    { icon: <MessageSquare size={28} />, title: 'Empathetic Conversations', description: 'Engage in meaningful, supportive chats anytime you need someone to listen.' },
    { icon: <BrainCircuit size={28} />, title: 'Guided Exercises', description: 'Access a library of mindfulness and cognitive behavioral therapy (CBT) exercises.' },
    { icon: <ShieldCheck size={28} />, title: 'Private & Secure', description: 'Your conversations are confidential, providing a safe space to express yourself.' },
    { icon: <Heart size={28} />, title: 'Community Support', description: 'Connect with a community that understands and supports you.' },
  ];

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const cards = gsap.utils.toArray(".feature-card");

    if (!sectionEl || cards.length === 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // The animation will now correctly animate FROM opacity-0
    timeline.to(cards, {
      opacity: 1, // Animate TO opacity 1
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.3
    });

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, []);

  const combinedRef = (el) => {
    sectionRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  return (
    <section ref={combinedRef} className="py-20 bg-white/80 dark:bg-slate-900/50 backdrop-blur-0 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <ScrollFloat as="h3" containerClassName="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
          A new way to find support
        </ScrollFloat>
        <ScrollFloat as="p" containerClassName="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16 text-lg">
          mAItri offers a suite of tools designed to help you navigate life's challenges.
        </ScrollFloat>
        
        <div className="grid md:grid-cols-4 gap-8">
          {featureCards.map((card) => (
            <div
              key={card.title}
              // --- THE CRUCIAL FIX IS HERE ---
              // Set the initial state with CSS classes so GSAP can animate FROM it.
              className="feature-card bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl shadow-md opacity-0 transform translate-y-16"
            >
              <IconWrapper>{card.icon}</IconWrapper>
              <h4 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{card.title}</h4>
              <p className="text-slate-500 dark:text-slate-400">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;