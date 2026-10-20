import React, { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Globe, Send, FileDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ThemeToggle, type ThemeOrigin } from './ThemeToggle';
import { Magnetic } from './Magnetic';
import type { SectionId } from '../hooks/useSectionNav';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: (mode?: 'dark' | 'light', origin?: ThemeOrigin) => void;
  onOpenTerminal?: () => void;
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenTerminal, activeSection, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 24));

  const handleNavClick = (sectionId: SectionId, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about }
  ];

  return (
    <motion.header
      className={`navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}
      layoutRoot
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.1 }}
    >
      <nav className="navbar" aria-label="Main Navigation">
        <a href="#home" className="brand-logo" aria-label="Mohammed Ahmed Portfolio Home" onClick={(e) => handleNavClick('home', e)}>
          <div className="logo-badge">MA</div>
          <span>Mohamed Ahmed</span>
        </a>

        {/* Navigation links share one pill that slides to the active section.
            The layoutId is per-language so it does not fly across when the layout mirrors. */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`nav-pill-${language}`}
                      className="nav-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="nav-link-label">{item.label}</span>
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
            {/* One thumb slides between the two segments */}
            <div className={`lang-segments is-${language}`}>
              <span className="lang-thumb" aria-hidden="true"></span>
              <button
                type="button"
                className={`lang-segment-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
                title="Switch to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
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
          </div>

          {/* Interactive Developer CLI */}
          {onOpenTerminal && (
            <Magnetic className="nav-cv-wrap">
            <a
              href="/Mohammed_AlQaffas_CV.pdf"
              download="Mohammed_AlQaffas_CV.pdf"
              className="nav-cv-btn"
              title={language === 'ar' ? 'تحميل السيرة الذاتية (PDF)' : 'Download Resume (PDF)'}
              aria-label={language === 'ar' ? 'تحميل السيرة الذاتية' : 'Download Resume'}
            >
              <FileDown size={14} className="cv-icon" />
              <span>{language === 'ar' ? 'السيرة الذاتية' : 'Resume CV'}</span>
            </a>
          </Magnetic>
          )}

          {/* Contact Direct CTA */}
          <Magnetic className="nav-cta-wrap">
            <a
              href="#contact"
              className="nav-cta"
              onClick={(e) => handleNavClick('contact', e)}
            >
              <span>{t.nav.contactBtn}</span>
              <Send size={14} className="cta-plane" />
            </a>
          </Magnetic>

          {/* Theme Toggle Button */}
          <ThemeToggle theme={theme} onToggle={(origin) => onToggleTheme(undefined, origin)} />
        </div>
      </nav>
    </motion.header>
  );
};
