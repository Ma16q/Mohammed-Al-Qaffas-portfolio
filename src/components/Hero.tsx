import React, { useState } from 'react';
import { ArrowDown, Code2, UserCheck, Terminal, RefreshCw, Box } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>{t.hero.statusBadge}</span>
            </div>

            <h1 className="hero-title">
              {t.hero.titleStart}{' '}
              <span className="gradient-text">{t.hero.titleGradient}</span>{' '}
              {t.hero.titleEnd}
            </h1>

            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown size={17} />
              </a>
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
            </div>

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
          </div>

          {/* Hero Right: 3D Flippable Avatar Card */}
          <div className="hero-visual">
            <div className="avatar-card-container">
              <div
                className={`avatar-3d-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped((prev) => !prev)}
                role="button"
                tabIndex={0}
                title="Click to flip between 3D avatar and personal photo"
              >
                {/* Front Face: 3D Avatar */}
                <div className="card-face face-3d">
                  <img
                    src="/assets/images/mohammed_3d_2.jpg"
                    alt="Mohamed 3D Avatar"
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
                  />
                  <div className="floating-glass-tag real-tag">
                    <UserCheck size={13} />
                    <span>{t.hero.flipBackTag}</span>
                  </div>
                </div>
              </div>

              {/* Avatar Showcase Controls */}
              <div className="avatar-controls">
                <button
                  type="button"
                  className="flip-toggle-btn"
                  onClick={() => setIsFlipped((prev) => !prev)}
                >
                  <RefreshCw size={14} className="flip-icon" />
                  <span>{isFlipped ? t.hero.flipShow3d : t.hero.flipShowReal}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
