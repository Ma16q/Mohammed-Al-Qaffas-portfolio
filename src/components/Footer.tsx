import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-copy">
          {t.footer.copy}
        </p>

        <div className="footer-links">
          <a href="#home">{t.nav.home}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="https://github.com/Ma16q" target="_blank" rel="noopener noreferrer">GitHub</a>
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="footer-terminal-btn"
              title={isAr ? 'فتح الطرفية البرمجية CLI' : 'Open Developer CLI'}
            >
              <Terminal size={14} />
              <span>{isAr ? 'الطرفية البرمجية CLI' : 'Terminal CLI'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            title={t.footer.top}
          >
            <span>{t.footer.top}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
