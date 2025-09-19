// src/components/AuthModal.jsx

import React from "react";
import Stepper, { Step } from "./Stepper";
import { motion } from "framer-motion";

const AuthModal = ({ isOpen, onClose, mode = 'signIn' }) => {
  if (!isOpen) return null;

  const signInSteps = [
    <Step key="signin-1">
      <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
      <p className="text-slate-400 mt-2">Please enter your email to sign in.</p>
      <input type="email" placeholder="Email" className="mt-6 w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </Step>,
    <Step key="signin-2">
      <h2 className="text-2xl font-bold text-white">Enter Your Password</h2>
      <p className="text-slate-400 mt-2">Enter the password for your account.</p>
      <input type="password" placeholder="Password" className="mt-6 w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </Step>,
    <Step key="signin-3">
      <h2 className="text-2xl font-bold text-white">You're all set!</h2>
      <p className="text-slate-400 mt-2">Welcome back to mAItri.</p>
    </Step>,
  ];

  const signUpSteps = [
    <Step key="signup-1">
      <h2 className="text-2xl font-bold text-white">Create your account</h2>
      <p className="text-slate-400 mt-2">First, let's get your username.</p>
       <input type="text" placeholder="Username" className="mt-6 w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </Step>,
    <Step key="signup-2">
      <h2 className="text-2xl font-bold text-white">Enter Your Email</h2>
      <p className="text-slate-400 mt-2">We'll use this to secure your account.</p>
      <input type="email" placeholder="Email" className="mt-6 w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </Step>,
     <Step key="signup-3">
      <h2 className="text-2xl font-bold text-white">Create a Password</h2>
      <p className="text-slate-400 mt-2">Make sure it's secure.</p>
      <input type="password" placeholder="Password" className="mt-6 w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500" />
    </Step>,
    <Step key="signup-4">
      <h2 className="text-2xl font-bold text-white">You're all set!</h2>
      <p className="text-slate-400 mt-2">Welcome to the mAItri community.</p>
    </Step>,
  ];
  
  const stepsToRender = mode === 'signIn' ? signInSteps : signUpSteps;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-lg p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-md mx-auto" // Centers the stepper container
        onClick={(e) => e.stopPropagation()}
      >
        <Stepper onFinalStepCompleted={onClose}>
          {stepsToRender}
        </Stepper>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
