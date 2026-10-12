import React from 'react';
import { Sun, Moon, Terminal, Globe, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (mode?: 'dark' | 'light') => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        <a href="#home" className="brand-logo" aria-label="Mohammed Ahmed Portfolio Home">
          <div className="logo-badge">MA</div>
          <span>Mohamed Ahmed</span>
        </a>

        <ul className="nav-links">
          <li><a href="#home" className="nav-link">{t.nav.home}</a></li>
          <li><a href="#projects" className="nav-link">{t.nav.projects}</a></li>
          <li><a href="#about" className="nav-link">{t.nav.about}</a></li>
          <li><a href="#contact" className="nav-link">{t.nav.contact}</a></li>
          <li>
            <a href="https://github.com/Ma16q" target="_blank" rel="noopener noreferrer" className="nav-link">
              {t.nav.github}
            </a>
          </li>
        </ul>

        <div className="nav-actions-group">
          {/* Professional Language Switcher */}
          <button
            type="button"
            className="lang-switcher-btn"
            onClick={toggleLanguage}
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            aria-label="Toggle language between English and Arabic"
          >
            <Globe size={15} className="lang-icon" />
            <span className="lang-current">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

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
          <a href="#contact" className="nav-cta">
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
