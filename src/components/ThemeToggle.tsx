import React, { useId } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export interface ThemeOrigin {
  x: number;
  y: number;
}

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: (origin: ThemeOrigin) => void;
}

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const morph = { type: 'spring', stiffness: 260, damping: 22 } as const;

// Sun <-> moon morph: a mask slides over the disc to carve the crescent while the rays retract.
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const { t } = useLanguage();
  const maskId = useId();
  const isDark = theme === 'dark';
  const label = isDark ? t.ui.themeToLight : t.ui.themeToDark;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.1, rotate: 12 }}
      whileTap={{ scale: 0.86 }}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        initial={false}
        animate={{ rotate: isDark ? -30 : 0 }}
        transition={morph}
      >
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            r="7"
            fill="black"
            initial={false}
            animate={{ cx: isDark ? 16.5 : 30, cy: isDark ? 7.5 : -2 }}
            transition={morph}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isDark ? 8.5 : 4.5 }}
          transition={morph}
        />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {RAY_ANGLES.map((angle, i) => (
            <g key={angle} transform={`rotate(${angle} 12 12)`}>
              <motion.line
                x1="12"
                y1="1.5"
                x2="12"
                y2="3.5"
                initial={false}
                animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0 : 1 }}
                transition={{ ...morph, delay: isDark ? 0 : 0.035 * i }}
              />
            </g>
          ))}
        </g>
      </motion.svg>
    </motion.button>
  );
};
