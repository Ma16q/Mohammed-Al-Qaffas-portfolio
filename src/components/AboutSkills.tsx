import React from 'react';
import { motion } from 'motion/react';
import { skillsData, experienceData } from '../data/portfolioData';
import { Reveal } from './Reveal';
import { trackSpotlight } from '../lib/pointer';
import { ExternalLink, Cpu, Briefcase, GraduationCap, Users, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Skill pills pop in one by one when the card scrolls into view
const pillContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } }
};
const pillItem = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 20 } }
} as const;

export const AboutSkills: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const getExpIcon = (id: string) => {
    switch (id) {
      case 'coop-training':
        return <Briefcase size={16} style={{ color: 'var(--accent-cyan)' }} />;
      case 'iau-degree':
        return <GraduationCap size={16} style={{ color: 'var(--accent-pink)' }} />;
      case 'gdg-campus':
        return <Users size={16} style={{ color: '#10b981' }} />;
      case 'hackathon':
        return <Trophy size={16} style={{ color: '#f59e0b' }} />;
      default:
        return <Briefcase size={16} style={{ color: 'var(--accent-cyan)' }} />;
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-pill">{t.about.sectionPill}</span>
          <h2 className="section-title">{t.about.sectionTitle}</h2>
        </Reveal>

        {/* Top Summary Card */}
        <Reveal>
          <div className="about-card glass-panel">
            <div className="about-text">
              <h3>{isAr ? 'محمد القفاص (محمد أحمد) • Ma16q' : 'Mohamed Al-Qaffas (Mohamed Ahmed) • Ma16q'}</h3>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7 }}>
                {isAr
                  ? 'خريج برنامج التدريب الميداني في هندسة البرمجيات وطالب علوم الحاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU) بالمنطقة الشرقية. متخصص في تطوير تطبيقات الجوال الأصلية (Native Android)، وحلول الويب التفاعلية الحديثة (React 19 + TypeScript)، وتجارب ثلاثية الأبعاد (Three.js WebGL).'
                  : 'Software Engineering Training Graduate and Computer Science student at Imam Abdulrahman Bin Faisal University (IAU), Eastern Province, Saudi Arabia. Specialized in Native Android development, reactive web architectures (React 19 + TypeScript), and interactive 3D WebGL experiences.'}
              </p>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.linkedin.com/in/ma16q/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <span>{isAr ? 'الملف الشخصي على LinkedIn' : 'LinkedIn Profile'}</span>
                  <ExternalLink size={14} />
                </a>
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
                <motion.div
                  className="skills-grid"
                  variants={pillContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                >
                  {skillsData.map((s, idx) => (
                    <motion.span key={idx} className="pop-item" variants={pillItem}>
                      <span className="skill-pill">
                        <span>{isAr && s.nameAr ? s.nameAr : s.name}</span>
                      </span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Experience & Training Milestones Grid */}
        <div style={{ marginTop: '2.5rem' }}>
          <Reveal style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-main)' }}>
              {isAr ? 'التدريب المهني والمسيرة الأكاديمية' : 'Professional Training & Academic Milestones'}
            </h3>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
            {experienceData.map((exp, idx) => (
              <Reveal key={exp.id} className="reveal-cell" delay={(idx % 3) * 0.08}>
                <div
                  className="mini-glass-card exp-card"
                  onPointerMove={trackSpotlight}
                  style={{
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    borderRadius: '14px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  {/* Top Row: Icon + Status Pill Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getExpIcon(exp.id)}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      padding: '0.2rem 0.65rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      color: 'var(--text-muted)'
                    }}>
                      {isAr ? exp.periodAr : exp.period}
                    </span>
                  </div>

                  {/* Main Titles: Full Card Width, No Squishing */}
                  <div>
                    <h4 style={{
                      margin: '0 0 0.35rem 0',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.45
                    }}>
                      {isAr ? exp.roleAr : exp.role}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.86rem',
                      fontWeight: 500,
                      color: 'var(--accent-cyan)',
                      lineHeight: 1.45
                    }}>
                      {isAr ? exp.organizationAr : exp.organization}
                    </p>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: '0.15rem 0 0 0'
                  }}>
                    {isAr ? exp.descriptionAr : exp.description}
                  </p>

                  {/* Skill / Technology Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto', paddingTop: '0.35rem' }}>
                    {exp.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          background: 'rgba(56, 189, 248, 0.08)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          borderRadius: '4px',
                          color: '#93c5fd'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
