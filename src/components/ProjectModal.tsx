import React, { useEffect } from 'react';
import type { Project } from '../types/portfolio';
import { X, CheckCircle, ExternalLink, Sparkles, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header Preview */}
        <div className="modal-media-wrap">
          {project.isGooglePlay ? (
            <div className={`app-icon-preview ${project.id === 'sunan' ? 'sunan-preview' : 'musbihati-preview'}`} style={{ height: '180px', marginBottom: 0 }}>
              <div className="app-icon-wrap" style={{ width: '90px', height: '90px' }}>
                <img src={project.appIcon} alt={project.title} className="app-icon-img" />
              </div>
            </div>
          ) : (
            <img src={project.image} alt={project.title} className="modal-media-img" />
          )}
          <div className="modal-media-overlay"></div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="project-tags" style={{ marginBottom: '0.6rem' }}>
            {project.tags.map((t, idx) => (
              <span key={idx} className={`tag ${t.color || ''}`}>
                {t.text}
              </span>
            ))}
          </div>

          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.summary}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Technical Highlights & Features</span>
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>
                    <CheckCircle size={15} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <Layers size={16} style={{ color: 'var(--accent-indigo)' }} />
                <span>Technologies & Architecture</span>
              </h4>
              <div className="modal-tech-pills">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="skill-pill" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="modal-actions">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`btn-card ${link.type}`}
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.95rem' }}
              >
                <span>{link.label}</span>
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
