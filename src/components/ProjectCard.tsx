import React from 'react';
import type { Project } from '../types/portfolio';
import { TiltCard } from './TiltCard';
import { Info, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInspect }) => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const title = isAr && project.titleAr ? project.titleAr : project.title;
  const summary = isAr && project.summaryAr ? project.summaryAr : project.summary;

  // Google Play Published App Card
  if (project.isGooglePlay) {
    const isSunan = project.id === 'sunan';
    return (
      <TiltCard className="project-card glass-panel app-card">
        <div className={`app-icon-preview ${isSunan ? 'sunan-preview' : 'musbihati-preview'}`}>
          <div className="app-icon-wrap">
            <img src={project.appIcon} alt={`${title} - App Icon`} className="app-icon-img" loading="lazy" />
          </div>
          <div className="holo-badge" style={{ top: '0.75rem', left: isAr ? 'auto' : '0.75rem', right: isAr ? '0.75rem' : 'auto' }}>
            <span className="holo-radar-dot" style={{ background: isSunan ? '#10b981' : '#38bdf8' }}></span>
            <span>{t.projects.appBadge}</span>
          </div>
        </div>

        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className={`tag ${tag.color || ''}`}>
              {isAr && tag.textAr ? tag.textAr : tag.text}
            </span>
          ))}
        </div>

        <h3 className="project-title">{title}</h3>
        <p className="project-summary">{summary}</p>

        <div className="project-actions">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card google-play"
            >
              <span>{isAr && link.labelAr ? link.labelAr : link.label}</span>
              <ExternalLink size={13} />
            </a>
          ))}
          {onInspect && (
            <button
              type="button"
              className="btn-card outline"
              onClick={() => onInspect(project)}
              title={t.projects.inspectBtn}
              style={{ flex: '0 0 auto', padding: '0.7rem 0.9rem' }}
            >
              <Info size={16} />
            </button>
          )}
        </div>
      </TiltCard>
    );
  }

  // Standard Software Project Card (MotriLog, Ghos, Numbers Game, My First React)
  return (
    <TiltCard className="project-card glass-panel">
      <div className="project-preview">
        <img src={project.image} alt={`${title} preview`} className="project-img" loading="lazy" />
        <div className="project-overlay"></div>
      </div>

      <div className="project-tags">
        {project.tags.map((tag, i) => (
          <span key={i} className={`tag ${tag.color || ''}`}>
            {isAr && tag.textAr ? tag.textAr : tag.text}
          </span>
        ))}
      </div>

      <h3 className="project-title">{title}</h3>
      <p className="project-summary">{summary}</p>

      <div className="project-actions">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-card ${link.type}`}
          >
            <span>{isAr && link.labelAr ? link.labelAr : link.label}</span>
            <ExternalLink size={13} />
          </a>
        ))}
        {onInspect && (
          <button
            type="button"
            className="btn-card outline"
            onClick={() => onInspect(project)}
            title={t.projects.inspectBtn}
            style={{ flex: '0 0 auto', padding: '0.7rem 0.9rem' }}
          >
            <Info size={16} />
          </button>
        )}
      </div>
    </TiltCard>
  );
};
