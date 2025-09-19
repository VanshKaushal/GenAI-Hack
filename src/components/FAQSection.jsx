import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VariableProximity from './VariableProximity';
import ProfileCard from './ProfileCard';
import ContactModal from './ContactModal';

const FAQSection = React.forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allQuestionsVisible, setAllQuestionsVisible] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const faqData = [
    {
      question: "What's the difference between mental health and mental illness?",
      answer: "Mental health refers to your overall psychological, emotional, and social well-being. It's a continuous spectrum, and everyone has it, just like everyone has physical health. Mental illness, on the other hand, is a diagnosed condition with specific symptoms that significantly affect a person's thinking, mood, and behavior over time.\n\nThink of it this way: anyone can have a day where they feel physically unwell, but that doesn't mean they have a chronic disease. Similarly, anyone can have a bad mental health day, but that's different from having a diagnosed mental illness like depression or an anxiety disorder. Good mental health is about having the resilience to cope with life's challenges, while a mental illness is a medical condition requiring professional care."
    },
    {
      question: "How do AI mental health bots actually work?",
      answer: "AI mental health bots, or chatbots, work by using Natural Language Processing (NLP) to understand and interpret what you type. They then use sophisticated algorithms to generate a relevant and supportive response. 🤖\n\nThere are generally two types:\n\nRule-Based Bots: These follow a pre-written script, much like a decision tree. They are good for structured exercises, like those found in Cognitive Behavioral Therapy (CBT).\n\nMachine Learning (ML) Bots: These are more advanced and learn from vast amounts of text data to generate more human-like and nuanced conversations.\n\nMost bots combine these approaches. They are programmed with therapeutic techniques (like CBT or mindfulness) to guide you through exercises, challenge negative thoughts, or offer coping strategies."
    },
    {
      question: "Can an AI bot replace a human therapist?",
      answer: "No, AI bots are not a replacement for human therapists. They are best viewed as a supplementary tool for support and skill-building.\n\nA human therapist provides a level of empathy, nuanced understanding, and a deep therapeutic relationship that AI cannot replicate. Therapists can diagnose conditions, handle complex trauma, and adapt treatment plans in ways that are far beyond a bot's capabilities. AI bots are excellent for providing immediate, 24/7 support, teaching basic coping skills, and offering a non-judgmental space to talk, especially for those who face barriers like cost or stigma."
    },
    {
      question: "Is talking to a mental health AI bot safe and private?",
      answer: "It depends on the service. Reputable AI bots use end-to-end encryption and have clear privacy policies that explain how your data is stored and used. Many services anonymize data to protect user identity.\n\nHowever, you should always be cautious. Before using a bot, it's wise to:\n\n• Read the privacy policy to understand what data is collected.\n• Avoid sharing highly sensitive personal information like your full name, address, or financial details.\n• Check for certifications or adherence to health data regulations like HIPAA (in the US).\n\nWhile the risk is generally low with trusted apps, absolute privacy is never guaranteed online."
    },
    {
      question: "What are the biggest benefits of using an AI mental health bot?",
      answer: "The three main benefits are accessibility, affordability, and anonymity.\n\nAccessibility: They are available 24/7 from your smartphone or computer, providing support whenever and wherever you need it. This bypasses waiting lists and scheduling conflicts.\n\nAffordability: Many bots are free or offer low-cost subscriptions, making them significantly cheaper than traditional therapy sessions.\n\nAnonymity: Talking to a bot can feel less intimidating than talking to a person. This helps reduce the stigma associated with seeking mental health support, encouraging more people to take the first step."
    },
    {
      question: "Can an AI bot help me if I'm in a crisis?",
      answer: "No. If you are in a mental health crisis (e.g., considering self-harm or suicide), you should contact a crisis hotline or emergency services immediately.\n\nAI bots are not equipped to manage crisis situations. In fact, a well-designed bot is programmed to recognize keywords related to a crisis. When it detects such language, it will stop the conversation and immediately provide you with contact information for crisis hotlines, such as the National Suicide Prevention Lifeline or local emergency numbers. This is a critical safety feature that underscores their role as a sub-crisis support tool, not an emergency service."
    }
  ];

  // Sequential animation for questions
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      if (currentQuestionIndex < faqData.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setAllQuestionsVisible(true);
        setIsAnimating(false);
      }
    }, 200); // Delay between each question

    return () => clearTimeout(timer);
  }, [currentQuestionIndex, isAnimating, faqData.length]);

  // Start animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating && !allQuestionsVisible) {
          setIsAnimating(true);
          setCurrentQuestionIndex(0);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isAnimating, allQuestionsVisible]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCardClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <section ref={ref} className="py-20 bg-white dark:bg-slate-900 section-animate transition-colors duration-300">
        <div ref={containerRef} className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h3>
            <motion.p 
              className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Everything you need to know about AI mental health support
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                       {/* Left side - Profile Card */}
              <div className="hidden lg:block relative h-96">
                <motion.div 
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <ProfileCard 
                    name="Dopaminds"
                    title="AI Mental Health Support"
                    handle="dopaminds"
                    status="Available 24/7"
                    contactText="Contact Us"
                    avatarUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop&crop=center"
                    onContactClick={handleCardClick}
                  />
                </motion.div>
              </div>
            
            {/* Right side - FAQ */}
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-300"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: index <= currentQuestionIndex ? 1 : 0,
                    x: index <= currentQuestionIndex ? 0 : 50
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300"
                  >
                    <span className="text-slate-800 dark:text-slate-200 font-medium pr-4">
                      {allQuestionsVisible ? (
                        <VariableProximity
                          label={faq.question}
                          fromFontVariationSettings="'wght' 500, 'wdth' 100"
                          toFontVariationSettings="'wght' 700, 'wdth' 120"
                          containerRef={containerRef}
                          radius={60}
                          falloff="gaussian"
                          className="text-lg"
                        />
                      ) : (
                        faq.question
                      )}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openIndex === index ? (
                        <ChevronUp className="text-slate-500 flex-shrink-0" size={20} />
                      ) : (
                        <ChevronDown className="text-slate-500 flex-shrink-0" size={20} />
                      )}
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Contact Button */}
            <div className="lg:hidden mt-8 text-center">
              <motion.button
                onClick={handleCardClick}
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
});

export default FAQSection;
