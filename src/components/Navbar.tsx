import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal, Globe, Send } from 'lucide-react';
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
