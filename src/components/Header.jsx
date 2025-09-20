
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import ThemeToggle from "./ThemeToggle";
import GlareHover from "./GlareHover";
import AuthModal from "./AuthModal";

const Header = ({
  navLinks,
  scrollToSection,
  className = "",
  ease = "power3.out",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const tlRef = useRef(null);

  // --- 1. ADDED STATE TO TRACK THEME ---
  const [theme, setTheme] = useState(
    () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  // --- 2. ADDED EFFECT TO LISTEN FOR THEME CHANGES ---
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (mode) => setModalMode(mode);
  const handleCloseModal = () => setModalMode(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 60;
    const contentEl = navEl.querySelector(".nav-links-content");
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      contentEl.style.visibility = "visible";
      const topBarHeight = 60;
      const contentHeight = contentEl.scrollHeight;
      const verticalPadding = 24;
      contentEl.style.visibility = wasVisible;
      return topBarHeight + contentHeight + verticalPadding;
    }
    return 180;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60 });
    gsap.set(linkRefs.current, { y: 20, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.5, ease })
      .to(linkRefs.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.3");
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl?.kill();
  }, [ease, navLinks]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const newTl = createTimeline();
      tlRef.current = newTl;
      if (isExpanded && newTl) newTl.progress(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, ease, navLinks]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setLinkRef = (i) => (el) => {
    if (el) linkRefs.current[i] = el;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="container mx-auto px-4 py-3">
          <nav
            ref={navRef}
            className="block h-[60px] rounded-xl shadow-lg backdrop-blur-sm relative overflow-hidden bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200"
          >
            <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-[2]">
              <button type="button" className="p-2" onClick={toggleMenu}>
                <div className="flex flex-col gap-[6px]">
                  <div className={`w-[30px] h-[3px] bg-current transition-transform duration-300 ${isHamburgerOpen ? "translate-y-[4.5px] rotate-45" : ""}`} />
                  <div className={`w-[30px] h-[3px] bg-current transition-transform duration-300 ${isHamburgerOpen ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
                </div>
              </button>

              {/* Text is restored, logo image is removed */}
              <div className="absolute left-1/2 -translate-x-1/2">
                <h1 className="text-3xl font-bold">Peace Pulse</h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button type="button" onClick={() => handleOpenModal('signIn')} className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition">Sign In</button>
                <button type="button" onClick={() => handleOpenModal('signUp')} className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition">Sign Up</button>
              </div>
            </div>
            <div className={`nav-links-content absolute inset-0 top-[60px] p-4 grid grid-cols-3 gap-3 z-[1] ${isExpanded ? "visible" : "invisible"}`}>
              {(navLinks || []).map((link, idx) => (
                <GlareHover
                  key={link.name}
                  ref={setLinkRef(idx)}
                  background={theme === 'dark' ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.7)"}
                  className="w-full aspect-[4/1] backdrop-blur-md rounded-2xl"
                >
                  <button type="button" onClick={() => { scrollToSection(link.ref); toggleMenu(); }} className="w-full h-full flex items-center justify-center text-base font-semibold">
                    {link.name}
                  </button>
                </GlareHover>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <AuthModal isOpen={!!modalMode} onClose={handleCloseModal} mode={modalMode} />
    </>
  );
};

export default Header;