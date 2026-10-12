import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import type { Category, Project } from '../types/portfolio';
import { LayoutGrid, Smartphone, Box, Gamepad2, Search, X } from 'lucide-react';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Projects', icon: <LayoutGrid size={15} /> },
  { id: 'mobile', label: 'Mobile Apps (Google Play)', icon: <Smartphone size={15} /> },
  { id: 'web-3d', label: '3D & Web Apps', icon: <Box size={15} /> },
  { id: 'games', label: 'Games & OOP', icon: <Gamepad2 size={15} /> }
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme, onInspect }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">Interactive Showcase</span>
          <h2 className="section-title">Projects & Published Apps</h2>
          <p className="section-desc">
            Explore live production apps on Google Play, interactive 3D WebGL car telemetry, and full-stack software.
          </p>

          {/* Search Bar + Category Filter Tabs */}
          <div className="search-filter-container">
            <div className="project-search-bar">
              <Search size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search projects, tags, or skills (e.g. Android, 3D, Python, Java...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="category-filter-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {searchQuery && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing {filteredProjects.length} of {projectsData.length} projects for "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <p>No projects match your search criteria.</p>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} theme={theme} onInspect={onInspect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
