import React, { useState } from 'react';
import { ArrowDown, Code2, Sparkles, UserCheck } from 'lucide-react';

export const Hero: React.FC = () => {
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
              Hi, I'm <strong>Mohamed Ahmed (Ma16q)</strong> — Student at <strong>Imam Abdulrahman Bin Faisal University (IAU)</strong>, Eastern Province, Saudi Arabia. Full-stack developer & 3D modeler with published Android applications on Google Play and modern Glassmorphism web designs.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>Explore Projects</span>
                <ArrowDown size={18} />
              </a>
              <a href="#about" className="btn-secondary">
                <span>About & Real Skills</span>
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
                <span className="stat-label">Student (Saudi Arabia)</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">3D</span>
                <span className="stat-label">WebGL Interactive</span>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Flippable Avatar Card */}
          <div className="hero-avatar-wrapper">
            <div
              className={`avatar-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label="Click to flip photo between 3D avatar and real Industr-iathon photo"
            >
              {/* Front Face (3D Avatar) */}
              <div className="avatar-face avatar-front">
                <img
                  src="/assets/images/mohammed_3d_2.jpg"
                  alt="Mohamed 3D Avatar with ISE Club backdrop"
                  className="avatar-photo"
                />
                <div className="avatar-overlay"></div>
                <div className="model-badge">
                  <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>3D ISE Club Avatar</span>
                </div>
              </div>

              {/* Back Face (Real Industr-iathon Photo) */}
              <div className="avatar-face avatar-back">
                <img
                  src="/assets/images/mohammed_real.jpg"
                  alt="Mohamed Real Photo at Industr-iathon event"
                  className="avatar-photo"
                />
                <div className="avatar-overlay"></div>
                <div className="model-badge">
                  <UserCheck size={14} style={{ color: '#10b981' }} />
                  <span>Real Industr-iathon Photo</span>
                </div>
              </div>
            </div>

            {/* Photo Flip Toggle Button */}
            <div className="avatar-controls">
              <button
                type="button"
                className="photo-toggle-btn"
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                <span>🔄</span>
                <span>{isFlipped ? 'Show 3D Avatar' : 'Show Real Photo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
