// src/components/Stepper.jsx

import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- FIX for centering step content ---
export function Step({ children }) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";
  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };
  return (
    <motion.div onClick={handleClick} className="relative cursor-pointer outline-none" animate={status} initial={false}>
      <motion.div variants={{ inactive: { scale: 1, backgroundColor: "#374151", color: "#9ca3af" }, active: { scale: 1.1, backgroundColor: "#3b82f6", color: "#fff" }, complete: { scale: 1, backgroundColor: "#10b981", color: "#fff" } }} transition={{ duration: 0.2 }} className="flex h-8 w-8 items-center justify-center rounded-full font-semibold">
        {status === "complete" ? <CheckIcon className="h-5 w-5 text-white" /> : <span className="text-sm">{step}</span>}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-2 h-1 flex-1 rounded-full bg-gray-700">
      <motion.div className="absolute left-0 top-0 h-full rounded-full bg-blue-500" initial={{ width: 0 }} animate={{ width: isComplete ? "100%" : 0 }} transition={{ duration: 0.3 }} />
    </div>
  );
}

const stepVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);
  return (
    <motion.div style={{ position: "relative", overflow: "hidden" }} animate={{ height: isCompleted ? 0 : parentHeight }} transition={{ type: "spring", duration: 0.4 }} className={className}>
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <motion.div key={currentStep} custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} ref={(el) => el && setParentHeight(el.offsetHeight)}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Stepper({
  children,
  initialStep = 1,
  onFinalStepCompleted = () => {},
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep, dir) => {
    setDirection(dir);
    setCurrentStep(newStep);
  };

  const handleBack = () => { if (currentStep > 1) updateStep(currentStep - 1, -1); };
  const handleNext = () => { if (!isLastStep) updateStep(currentStep + 1, 1); else onFinalStepCompleted(); };

  return (
    <div className="w-full rounded-2xl shadow-xl bg-slate-900/50 backdrop-blur-md p-6" {...rest}>
      <div className="flex w-full items-center justify-center px-4 py-2">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={stepNumber}>
              <StepIndicator step={stepNumber} currentStep={currentStep} onClickStep={(s) => updateStep(s, s > currentStep ? 1 : -1)} />
              {index < totalSteps - 1 && <StepConnector isComplete={currentStep > stepNumber} />}
            </React.Fragment>
          );
        })}
      </div>
      <StepContentWrapper isCompleted={currentStep > totalSteps} currentStep={currentStep} direction={direction} className="mt-6">
        {stepsArray[currentStep - 1]}
      </StepContentWrapper>
      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} disabled={currentStep === 1} className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 disabled:opacity-50 transition">Back</button>
        <button onClick={handleNext} className="px-6 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition">
          {isLastStep ? "Done" : "Continue"}
        </button>
      </div>
    </div>
  );
}
