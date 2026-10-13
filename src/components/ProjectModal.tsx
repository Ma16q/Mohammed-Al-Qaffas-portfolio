import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '../types/portfolio';
import { X, ExternalLink, Cpu, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const bodyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } }
};
const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } }
} as const;

const ModalCard: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const title = isAr && project.titleAr ? project.titleAr : project.title;
  const summary = isAr && project.summaryAr ? project.summaryAr : project.summary;
  const highlights = isAr && project.highlightsAr ? project.highlightsAr : project.highlights;

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 48, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.95, transition: { duration: 0.18 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
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
        <motion.div className="modal-body" variants={bodyVariants} initial="hidden" animate="show">
          {/* Banner image or App Icon */}
          {project.image ? (
            <motion.div className="modal-banner-wrap" variants={rowVariants}>
              <img src={project.image} alt={title} className="modal-banner-img" />
            </motion.div>
          ) : project.appIcon ? (
            <motion.div className="modal-icon-banner" variants={rowVariants}>
              <img src={project.appIcon} alt={title} className="modal-app-icon" />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {isAr && project.badgeAr ? project.badgeAr : project.badge}
                </p>
              </div>
            </motion.div>
          ) : null}

          {/* Summary */}
          <motion.p className="modal-summary-text" variants={rowVariants}>{summary}</motion.p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="modal-section">
              <motion.h4 className="modal-section-title" variants={rowVariants}>
                <CheckCircle size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>{t.projects.keyHighlights}</span>
              </motion.h4>
              <ul className="modal-highlights-list">
                {highlights.map((h, i) => (
                  <motion.li key={i} className="modal-highlight-item" variants={rowVariants}>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div className="modal-section">
              <motion.h4 className="modal-section-title" variants={rowVariants}>
                <Cpu size={16} style={{ color: 'var(--accent-pink)' }} />
                <span>{t.projects.techStack}</span>
              </motion.h4>
              <div className="modal-tech-pills">
                {project.techStack.map((tech, i) => (
                  <motion.span key={i} className="tech-pill" variants={rowVariants}>
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

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
      </motion.div>
    </motion.div>
  );
};

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
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && <ModalCard key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
};
