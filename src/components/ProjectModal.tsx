import React, { useEffect } from 'react';
import type { Project } from '../types/portfolio';
import { X, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = isAr && project.titleAr ? project.titleAr : project.title;
  const summary = isAr && project.summaryAr ? project.summaryAr : project.summary;
  const highlights = isAr && project.highlightsAr ? project.highlightsAr : project.highlights;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="section-pill" style={{ marginBottom: 0 }}>
              {project.category.toUpperCase()}
            </span>
            <h2 className="modal-title">{title}</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="modal-body">
          {/* Banner image or App Icon */}
          {project.image ? (
            <div className="modal-banner-wrap">
              <img src={project.image} alt={title} className="modal-banner-img" />
            </div>
          ) : project.appIcon ? (
            <div className="modal-icon-banner">
              <img src={project.appIcon} alt={title} className="modal-app-icon" />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#f8fafc' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {isAr && project.badgeAr ? project.badgeAr : project.badge}
                </p>
              </div>
            </div>
          ) : null}

          {/* Summary */}
          <p className="modal-summary-text">{summary}</p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <CheckCircle size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>{t.projects.keyHighlights}</span>
              </h4>
              <ul className="modal-highlights-list">
                {highlights.map((h, i) => (
                  <li key={i} className="modal-highlight-item">
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <Cpu size={16} style={{ color: 'var(--accent-pink)' }} />
                <span>{t.projects.techStack}</span>
              </h4>
              <div className="modal-tech-pills">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <div className="modal-links-row">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-card ${link.type}`}
                style={{ padding: '0.65rem 1.25rem' }}
              >
                <span>{isAr && link.labelAr ? link.labelAr : link.label}</span>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '0.85rem' }}>
            {t.projects.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
