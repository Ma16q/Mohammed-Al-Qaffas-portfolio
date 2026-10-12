import React from 'react';
import { Sun, Moon, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (mode?: 'dark' | 'light') => void;
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal }) => {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        <a href="#home" className="brand-logo" aria-label="Mohammed Ahmed Portfolio Home">
          <div className="logo-badge">MA</div>
          <span>Mohamed Ahmed</span>
        </a>

        <ul className="nav-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#about" className="nav-link">About & Skills</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
          <li>
            <a href="https://github.com/Ma16q" target="_blank" rel="noopener noreferrer" className="nav-link">
              GitHub ↗
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {onOpenTerminal && (
            <button
              type="button"
              className="terminal-nav-btn"
              onClick={onOpenTerminal}
              title="Open Interactive Dev Terminal (CLI)"
              aria-label="Open Dev Terminal"
            >
              <Terminal size={16} />
              <span className="terminal-nav-text">CLI</span>
            </button>
          )}

          <a href="#contact" className="nav-cta">
            <span>Say Hello</span>
            <Sparkles size={15} />
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => onToggleTheme()}
            aria-label="Toggle Light and Dark Mode"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
};
