import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSkills } from './components/AboutSkills';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { DevTerminal } from './components/DevTerminal';
import { LanguageProvider } from './context/LanguageContext';
import type { Project } from './types/portfolio';

const PortfolioContent: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleToggleTheme = (mode?: 'dark' | 'light') => {
    if (mode) {
      setTheme(mode);
    } else {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return (
    <div className="portfolio-app">
      {/* Ambient Glow Orbs Background */}
      <div className="ambient-glow" aria-hidden="true">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
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
      <PortfolioContent />
    </LanguageProvider>
  );
};

export default App;
