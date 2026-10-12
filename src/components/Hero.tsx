import React, { useState } from 'react';
import {ArrowDown, Code2, Sparkles, UserCheck, Terminal} from "lucide-react";

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Available for Projects & Tech Innovation</span>
            </div>

            <h1 className="hero-title">
              Crafting <span className="gradient-text">Interactive 3D</span> & Modern Web Experiences
            </h1>

            <p className="hero-subtitle">
              Hi, I'm <strong>Mohamed Ahmed (Ma16q)</strong> — Student at <strong>Imam Abdulrahman Bin Faisal University (IAU)</strong>, Eastern Province, Saudi Arabia. Full-stack developer & 3D modeler with published Android applications on Google Play and modern Glassmorphism web engineering.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>Explore Projects</span>
                <ArrowDown size={18} />
              </a>
              {onOpenTerminal && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onOpenTerminal}
                  title="Open Interactive Developer CLI"
                >
                  <Terminal size={17} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Open Dev Terminal</span>
                </button>
              )}
              <a href="#about" className="btn-secondary">
                <span>About & Skills</span>
                <Code2 size={18} />
              </a>
            </div>

            <div className="stats-strip">
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Google Play Apps</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">IAU</span>
                <span className="stat-label">Saudi University</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">3D</span>
                <span className="stat-label">Three.js WebGL</span>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Flippable Avatar Card with Exact Sizing */}
          <div className="hero-visual">
            <div className="avatar-card-container">
              <div
                className={`avatar-3d-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped((prev) => !prev)}
                role="button"
                tabIndex={0}
                title="Click to flip between 3D avatar and real photo"
              >
                {/* Front Face: 3D Avatar */}
                <div className="card-face face-3d">
                  <img
                    src="/assets/images/mohammed_3d_2.jpg"
                    alt="Mohamed 3D Avatar with ISE Club backdrop"
                  />
                  <div className="floating-glass-tag">
                    <Sparkles size={13} />
                    <span>3D ISE Club Avatar</span>
                  </div>
                </div>

                {/* Back Face: Real Industr-iathon Photo */}
                <div className="card-face face-real">
                  <img
                    src="/assets/images/mohammed_real.jpg"
                    alt="Mohamed Real Photo at Industr-iathon event"
                  />
                  <div className="floating-glass-tag real-tag">
                    <UserCheck size={13} />
                    <span>Real Industr-iathon Photo</span>
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
                  <span>🔄</span>
                  <span>{isFlipped ? 'Show 3D Avatar' : 'Show Real Photo'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
