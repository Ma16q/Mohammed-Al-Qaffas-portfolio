import React from 'react';
import { Sun, Moon, Terminal, Globe, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (mode?: 'dark' | 'light') => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal }) => {
  const { language, setLanguage, t } = useLanguage();

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
