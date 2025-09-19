import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-white py-10 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} mAItri. All rights reserved.</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 transition-colors duration-300">A companion for your mental wellness journey.</p>
      </div>
    </footer>
  );
};

export default Footer;