import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-copy">
          © {new Date().getFullYear()} Mohamed Ahmed (Ma16q) • Imam Abdulrahman Bin Faisal University (IAU).
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="https://github.com/Ma16q" target="_blank" rel="noopener noreferrer">GitHub</a>
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
