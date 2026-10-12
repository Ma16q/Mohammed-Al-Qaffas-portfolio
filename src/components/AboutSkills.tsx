import React from 'react';
import { skillsData, experienceData } from '../data/portfolioData';
import { ExternalLink, Cpu, Briefcase, GraduationCap, Users, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
        <div className="section-header">
          <span className="section-pill">{t.about.sectionPill}</span>
          <h2 className="section-title">{t.about.sectionTitle}</h2>
        </div>

        {/* Top Summary Card */}
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
              <div className="skills-grid">
                {skillsData.map((s, idx) => (
                  <span key={idx} className="skill-pill">
                    <span>{isAr && s.nameAr ? s.nameAr : s.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Training Milestones Grid */}
        <div style={{ marginTop: '2.5rem' }}>
          <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.35rem', margin: 0, color: '#f8fafc' }}>
              {isAr ? 'التدريب المهني والمسيرة الأكاديمية' : 'Professional Training & Academic Milestones'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {experienceData.map((exp) => (
              <div key={exp.id} className="mini-glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.45rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', display: 'flex' }}>
                      {getExpIcon(exp.id)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#f8fafc' }}>
                        {isAr ? exp.roleAr : exp.role}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                        {isAr ? exp.organizationAr : exp.organization}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {isAr ? exp.periodAr : exp.period}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0.25rem 0' }}>
                  {isAr ? exp.descriptionAr : exp.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '4px', color: '#93c5fd' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
