import { useState, useEffect } from 'react';
// You can use any icons you like from react-icons
import { FaSun, FaMoon } from 'react-icons/fa';
import InteractiveHoverButton from './InteractiveHoverButton'; // Assuming this is your styled button

const ThemeToggle = ({ className = '' }) => {
  // Initialize state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  // Effect to apply the theme to the <html> element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <InteractiveHoverButton
      onClick={handleToggle}
      variant="ghost" // A variant with no background might be suitable
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`p-2 ${className}`}
    >
      {theme === 'dark' ? (
        <FaSun className="h-5 w-5 text-yellow-400" />
      ) : (
        <FaMoon className="h-5 w-5 text-slate-600" />
      )}
    </InteractiveHoverButton>
  );
};

export default ThemeToggle;
