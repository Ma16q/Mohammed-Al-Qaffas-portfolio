import React from 'react';
import { skillsData } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

export const AboutSkills: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">About & Skills</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-card glass-panel">
          <div className="about-text">
            <h3>Mohamed Ahmed (Ma16q)</h3>
            <p>
              Student at <strong>Imam Abdulrahman Bin Faisal University (IAU)</strong>, Eastern Province, Saudi Arabia.
            </p>
            <p>
              Participant in <strong>Industr-iathon</strong> (Advanced Technology Track with the ISE Club). I enjoy building software tools, web platforms, and responsive interfaces with clean code and modern Glassmorphism aesthetics.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Ma16q"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <span>GitHub Profile</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://linktr.ee/Mohamed_Ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <span>Linktree</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="about-side-box">
            {/* Real Skills */}
            <div className="mini-glass-card">
              <h4>🛠️ Technical Skills</h4>
              <div className="skills-grid" style={{ marginTop: '0.75rem' }}>
                {skillsData.map((s, idx) => (
                  <span key={idx} className="skill-pill">
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite Games */}
            <div className="mini-glass-card" style={{ marginTop: '1.25rem' }}>
              <h4>🎮 Favorite Games</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Ark: Survival Evolved • Kingdom Come: Deliverance II • Elden Ring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
