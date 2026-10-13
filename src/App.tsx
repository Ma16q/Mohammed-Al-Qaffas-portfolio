import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSkills } from './components/AboutSkills';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { DevTerminal } from './components/DevTerminal';

import { CursorAura } from './components/CursorAura';
import { MobileDock } from './components/MobileDock';
import { ContactDock } from './components/ContactDock';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { useSectionNav } from './hooks/useSectionNav';
import type { ThemeOrigin } from './components/ThemeToggle';
import type { Project } from './types/portfolio';

type Theme = 'dark' | 'light';

const PortfolioContent: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const themeRef = useRef(theme);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { active: activeSection, goTo } = useSectionNav();

  // Layout effect so the body class is already applied when the view transition snapshots the new theme
  useLayoutEffect(() => {
    themeRef.current = theme;
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Switches theme with a circular reveal that grows out of `origin` (the toggle button)
  const handleToggleTheme = useCallback((mode?: Theme, origin?: ThemeOrigin) => {
    const next = mode ?? (themeRef.current === 'dark' ? 'light' : 'dark');
    if (next === themeRef.current) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement;

    root.classList.add('theme-switching');
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, []);

  return (
    <div className="portfolio-app">
      

      {/* Ambient Glow Orbs Background */}
      <div className="ambient-glow" aria-hidden="true">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <CursorAura />
      </div>

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
        onNavigate={goTo}
      />

      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsSection
          theme={theme}
          onInspect={(proj) => setSelectedProject(proj)}
        />
        <AboutSkills />
        <ContactSection />
      </main>

      <Footer />

      {/* Mobile section tabs + floating quick-contact / feedback button */}
      <MobileDock activeSection={activeSection} onNavigate={goTo} />
      <ContactDock onNavigate={goTo} />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Developer CLI Terminal with AI & Security Guard */}
      <DevTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <PortfolioContent />
        </ToastProvider>
      </MotionConfig>
    </LanguageProvider>
  );
};

export default App;
