import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import type { Category, Project } from '../types/portfolio';
import { LayoutGrid, Smartphone, Box, Gamepad2, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme, onInspect }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.projects.categories.all, icon: <LayoutGrid size={15} /> },
    { id: 'mobile', label: t.projects.categories.mobile, icon: <Smartphone size={15} /> },
    { id: 'web-3d', label: t.projects.categories.web3d, icon: <Box size={15} /> },
    { id: 'games', label: t.projects.categories.games, icon: <Gamepad2 size={15} /> }
  ];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesEn =
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.tags.some((t) => t.text.toLowerCase().includes(query));

    const matchesAr =
      (p.titleAr && p.titleAr.toLowerCase().includes(query)) ||
      (p.summaryAr && p.summaryAr.toLowerCase().includes(query)) ||
      p.tags.some((t) => t.textAr && t.textAr.toLowerCase().includes(query));

    return matchesCategory && (matchesEn || matchesAr);
  });

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">{t.projects.sectionPill}</span>
          <h2 className="section-title">{t.projects.sectionTitle}</h2>
          <p className="section-desc">
            {t.projects.sectionDesc}
          </p>

          {/* Search Bar + Category Filter Tabs */}
          <div className="search-filter-container">
            <div className="project-search-bar">
              <Search size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t.projects.searchPlaceholder}
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
              {categories.map((cat) => (
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
                {t.projects.showingResults(filteredProjects.length, projectsData.length, searchQuery)}
              </p>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <p>{t.projects.noResults}</p>
            <button
              type="button"
              className="btn-secondary"
              style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              {t.projects.resetFilters}
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
