import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="#contact" className="nav-cta">
            <span>Say Hello</span>
            <Sparkles size={16} />
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
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
