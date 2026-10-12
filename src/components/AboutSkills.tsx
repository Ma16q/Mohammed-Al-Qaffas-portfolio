import React from 'react';
import { skillsData } from '../data/portfolioData';
import { ExternalLink, Cpu, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSkills: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">{t.about.sectionPill}</span>
          <h2 className="section-title">{t.about.sectionTitle}</h2>
        </div>

        <div className="about-card glass-panel">
          <div className="about-text">
            <h3>{t.about.name}</h3>
            <p>{t.about.uniText}</p>
            <p>{t.about.hackathonText}</p>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Ma16q"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <span>{t.about.githubBtn}</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://linktr.ee/Mohamed_Ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
              >
                <span>{t.about.linktreeBtn}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="about-side-box">
            {/* Real Skills */}
            <div className="mini-glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                <Cpu size={16} style={{ color: 'var(--accent-cyan)' }} />
                <h4 style={{ margin: 0 }}>{t.about.skillsTitle}</h4>
              </div>
              <div className="skills-grid">
                {skillsData.map((s, idx) => (
                  <span key={idx} className="skill-pill">
                    <span>{isAr && s.nameAr ? s.nameAr : s.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite Games */}
            <div className="mini-glass-card" style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <Gamepad2 size={16} style={{ color: 'var(--accent-pink)' }} />
                <h4 style={{ margin: 0 }}>{t.about.gamesTitle}</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                {t.about.gamesList}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
