import React, { useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';
import { ArrowDown, Code2, UserCheck, Terminal, RefreshCw, Box } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onOpenTerminal?: () => void;
}

// Children of the hero column rise in one after another on first paint
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } }
};
const riseIn = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 18 } }
} as const;
// Text-only variant: a `filter` on a wrapper would cut off the backdrop blur of glass children
const riseInBlur = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 110, damping: 18 } }
} as const;

const tiltSpring = { stiffness: 150, damping: 16, mass: 0.6 };
const MAX_AVATAR_TILT = 10;

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(t.ui.typedPhrases, !reduceMotion);

  // Avatar card leans toward the cursor
  const tiltX = useSpring(0, tiltSpring);
  const tiltY = useSpring(0, tiltSpring);

  const handleAvatarMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_AVATAR_TILT);
    tiltX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_AVATAR_TILT);
  };

  const handleAvatarLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <motion.div className="hero-content" variants={staggerContainer} initial="hidden" animate="show">
            <motion.div className="status-badge" variants={riseIn}>
              <span className="status-dot"></span>
              <span>{t.hero.statusBadge}</span>
            </motion.div>

            <motion.h1 className="hero-title" variants={riseInBlur}>
              {t.hero.titleStart}{' '}
              <span className="gradient-text">{t.hero.titleGradient}</span>{' '}
              {t.hero.titleEnd}
            </motion.h1>

            {/* Typewriter line cycling through the main stack */}
            <motion.p className="hero-typed" variants={riseIn}>
              <span className="typed-prefix">{t.ui.typedPrefix}</span>
              <span className="typed-text" dir="ltr">
                {typed}
                <span className="typed-caret" aria-hidden="true"></span>
              </span>
            </motion.p>

            <motion.p className="hero-subtitle" variants={riseInBlur}>
              {t.hero.subtitle}
            </motion.p>

            <motion.div className="hero-actions" variants={riseIn}>
              <Magnetic strength={0.25}>
                <a href="#projects" className="btn-primary">
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowDown size={17} className="bounce-icon" />
                </a>
              </Magnetic>
              {onOpenTerminal && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onOpenTerminal}
                  title="Open Interactive Developer CLI"
                >
                  <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{t.hero.openCliBtn}</span>
                </button>
              )}
              <a href="#about" className="btn-secondary">
                <span>{t.hero.aboutBtn}</span>
                <Code2 size={16} />
              </a>
            </motion.div>

            <motion.div variants={riseIn}>
              <div className="stats-strip">
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">{t.hero.statApps}</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">IAU</span>
                  <span className="stat-label">{t.hero.statUni}</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">3D</span>
                  <span className="stat-label">{t.hero.stat3d}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right: 3D Flippable Avatar Card */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.35 }}
          >
            <div
              className="avatar-card-container"
              onPointerMove={handleAvatarMove}
              onPointerLeave={handleAvatarLeave}
            >
              <motion.div className="avatar-tilt" style={{ rotateX: tiltX, rotateY: tiltY }}>
                <div
                  className={`avatar-3d-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={toggleFlip}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                  title="Click to flip between 3D avatar and personal photo"
                >
                  {/* Front Face: 3D Avatar */}
                  <div className="card-face face-3d">
                    <img
                      src="/assets/images/mohammed_3d_2.jpg"
                      alt="Mohamed 3D Avatar"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    <div className="floating-glass-tag">
                      <Box size={13} />
                      <span>{t.hero.flipFrontTag}</span>
                    </div>
                  </div>

                  {/* Back Face: Real Photo */}
                  <div className="card-face face-real">
                    <img
                      src="/assets/images/mohammed_real.jpg"
                      alt="Mohamed Ahmed - Personal Photo"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="floating-glass-tag real-tag">
                      <UserCheck size={13} />
                      <span>{t.hero.flipBackTag}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Avatar Showcase Controls */}
              <div className="avatar-controls">
                <button
                  type="button"
                  className="flip-toggle-btn"
                  onClick={toggleFlip}
                >
                  <motion.span
                    className="flip-icon-wrap"
                    animate={{ rotate: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    <RefreshCw size={14} className="flip-icon" />
                  </motion.span>
                  <span>{isFlipped ? t.hero.flipShow3d : t.hero.flipShowReal}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
