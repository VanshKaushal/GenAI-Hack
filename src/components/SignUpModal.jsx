// src/components/SignUpModal.jsx

import React from "react";
import Stepper, { Step } from "./Stepper";
import { motion } from "framer-motion";

const SignUpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <Stepper>
          <Step>
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="text-slate-400">Enter your details to get started.</p>
            {/* Add your form fields here for Step 1 */}
          </Step>
          <Step>
            <h2 className="text-2xl font-bold text-white">Verify your email</h2>
            <p className="text-slate-400">We've sent a code to your inbox.</p>
            {/* Add your form fields here for Step 2 */}
          </Step>
          <Step>
            <h2 className="text-2xl font-bold text-white">You're all set!</h2>
            <p className="text-slate-400">Welcome to mAItri.</p>
            {/* Add your final confirmation message here for Step 3 */}
          </Step>
        </Stepper>
      </motion.div>
    </motion.div>
  );
};

export default SignUpModal;
