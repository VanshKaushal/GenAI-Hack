import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-8 relative animate-zoom-in transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-300">
          <X />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-slate-200 transition-colors duration-300">{type === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors duration-300" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors duration-300" />
          </div>
          <button type="submit" className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors duration-300">
            {type === 'signIn' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;