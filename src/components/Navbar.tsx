import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Globe, Send, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (mode?: 'dark' | 'light') => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Auto-detect active section on scroll
  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setClickedItem(sectionId);
    setTimeout(() => setClickedItem(null), 500);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        <a href="#home" className="brand-logo" aria-label="Mohammed Ahmed Portfolio Home" onClick={(e) => handleNavClick('home', e)}>
          <div className="logo-badge">MA</div>
          <span>Mohamed Ahmed</span>
        </a>

        {/* Interactive Navigation Links with Active Indicator */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isJustClicked = clickedItem === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? 'active' : ''} ${isJustClicked ? 'just-clicked' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions-group">
          {/* Distinctive GitHub Developer Badge Button */}
          <a
            href="https://github.com/Ma16q"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-github-btn"
            title="Visit Mohamed's GitHub profile (@Ma16q)"
            aria-label="GitHub Profile (Ma16q)"
          >
            <svg
              className="github-octo-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="github-text">GitHub</span>
            <ExternalLink size={11} className="github-ext-icon" />
          </a>

          {/* Luxury Segmented Language Switcher */}
          <div className="premium-lang-switch" role="group" aria-label="Select Language">
            <div className="lang-globe-icon-wrap" title="Language Selector">
              <Globe size={13} className="lang-globe-icon" />
            </div>
            <button
              type="button"
              className={`lang-segment-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              title="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <span className="lang-segment-divider" aria-hidden="true"></span>
            <button
              type="button"
              className={`lang-segment-btn ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
              title="التحويل للغة العربية"
              aria-pressed={language === 'ar'}
            >
              عربي
            </button>
          </div>

          {/* Interactive Developer CLI */}
          {onOpenTerminal && (
            <button
              type="button"
              className="terminal-nav-btn"
              onClick={onOpenTerminal}
              title="Open Interactive Dev Terminal (CLI)"
              aria-label="Open Dev Terminal"
            >
              <Terminal size={15} />
              <span className="terminal-nav-text">{t.nav.cli}</span>
            </button>
          )}

          {/* Contact Direct CTA */}
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleNavClick('contact', e)}
          >
            <span>{t.nav.contactBtn}</span>
            <Send size={14} />
          </a>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle"
            onClick={() => onToggleTheme()}
            aria-label="Toggle Light and Dark Mode"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
};
