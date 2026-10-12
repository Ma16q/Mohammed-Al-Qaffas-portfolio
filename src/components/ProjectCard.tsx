import React, { useState } from 'react';
import type { Project } from '../types/portfolio';
import { Car3DViewer } from './Car3DViewer';
import { Info } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, theme, onInspect }) => {
  const [motriView, setMotriView] = useState<'3d' | 'hologram'>('3d');

  if (project.is3dInteractive) {
    return (
      <article className="project-card glass-panel" id="motrilogCard">
        {/* MotriLog View Mode Switcher */}
        <div className="motrilog-view-toggle" aria-label="Select MotriLog View Mode">
          <button
            type="button"
            className={`motri-tab-btn ${motriView === '3d' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setMotriView('3d');
            }}
          >
            <span>🎮 3D Interactive</span>
          </button>
          <button
            type="button"
            className={`motri-tab-btn ${motriView === 'hologram' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setMotriView('hologram');
            }}
          >
            <span>🖼️ Hologram UI</span>
          </button>
        </div>

        <div className="project-preview motrilog-preview-wrap">
          {motriView === '3d' ? (
            <Car3DViewer theme={theme} />
          ) : (
            <div className="car3d-static-render active">
              <img
                src={project.image}
                alt="MotriLog 3D Holographic Vehicle Telemetry"
                className="project-img"
                loading="lazy"
              />
              <div className="holo-scan-line"></div>
              <div className="holo-badge">
                <span className="holo-radar-dot"></span>
                <span>3D Telemetry HUD</span>
              </div>
              <div className="holo-hotspots">
                <span className="hotspot hotspot-engine">
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-label">Engine 94%</span>
                </span>
                <span className="hotspot hotspot-tire">
                  <span className="hotspot-pulse"></span>
                  <span className="hotspot-label">Tires 35 PSI</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className={`tag ${tag.color || ''}`}>
              {tag.text}
            </span>
          ))}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="project-actions">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-card ${link.type}`}
            >
              <span>{link.label}</span>
            </a>
          ))}
          {onInspect && (
            <button
              type="button"
              className="btn-card outline"
              onClick={() => onInspect(project)}
              title="Inspect project details"
              style={{ flex: '0 0 auto', padding: '0.7rem 0.9rem' }}
            >
              <Info size={16} />
            </button>
          )}
        </div>
      </article>
    );
  }

  // Google Play App Card
  if (project.isGooglePlay) {
    const isSunan = project.id === 'sunan';
    return (
      <article className="project-card glass-panel app-card">
        <div className={`app-icon-preview ${isSunan ? 'sunan-preview' : 'musbihati-preview'}`}>
          <div className="app-icon-wrap">
            <img src={project.appIcon} alt={`${project.title} - Official App Icon`} className="app-icon-img" loading="lazy" />
          </div>
          <div className="holo-badge" style={{ top: '0.75rem', left: '0.75rem' }}>
            <span className="holo-radar-dot" style={{ background: isSunan ? '#10b981' : '#38bdf8' }}></span>
            <span>Google Play App</span>
          </div>
        </div>

        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className={`tag ${tag.color || ''}`}>
              {tag.text}
            </span>
          ))}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        <div className="project-actions">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-card google-play"
            >
              <span>{link.label}</span>
            </a>
          ))}
          {onInspect && (
            <button
              type="button"
              className="btn-card outline"
              onClick={() => onInspect(project)}
              title="Inspect details"
              style={{ flex: '0 0 auto', padding: '0.7rem 0.9rem' }}
            >
              <Info size={16} />
            </button>
          )}
        </div>
      </article>
    );
  }

  // Standard Project Card
  return (
    <article className="project-card glass-panel">
      <div className="project-preview">
        <img src={project.image} alt={`${project.title} preview`} className="project-img" loading="lazy" />
        <div className="project-overlay"></div>
      </div>

      <div className="project-tags">
        {project.tags.map((tag, i) => (
          <span key={i} className={`tag ${tag.color || ''}`}>
            {tag.text}
          </span>
        ))}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-summary">{project.summary}</p>

      <div className="project-actions">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`btn-card ${link.type}`}
          >
            <span>{link.label}</span>
          </a>
        ))}
        {onInspect && (
          <button
            type="button"
            className="btn-card outline"
            onClick={() => onInspect(project)}
            title="Inspect details"
            style={{ flex: '0 0 auto', padding: '0.7rem 0.9rem' }}
          >
            <Info size={16} />
          </button>
        )}
      </div>
    </article>
  );
};
