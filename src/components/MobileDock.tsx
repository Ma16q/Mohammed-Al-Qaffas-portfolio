import React from 'react';
import { motion } from 'motion/react';
import { House, LayoutGrid, UserRound, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { SectionId } from '../hooks/useSectionNav';

interface MobileDockProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

// Bottom tab bar that replaces the hidden navbar links on phones and tablets.
export const MobileDock: React.FC<MobileDockProps> = ({ activeSection, onNavigate }) => {
  const { language, t } = useLanguage();

  const items: { id: SectionId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <House size={19} /> },
    { id: 'projects', label: t.nav.projects, icon: <LayoutGrid size={19} /> },
    { id: 'about', label: t.nav.about, icon: <UserRound size={19} /> },
    { id: 'contact', label: t.nav.contact, icon: <Mail size={19} /> }
  ];

  return (
    <motion.nav
      className="mobile-dock"
      aria-label="Section Navigation"
      layoutRoot
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.5 }}
    >
      {items.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`dock-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
          >
            {isActive && (
              <motion.span
                layoutId={`dock-pill-${language}`}
                className="dock-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </a>
        );
      })}
    </motion.nav>
  );
};
