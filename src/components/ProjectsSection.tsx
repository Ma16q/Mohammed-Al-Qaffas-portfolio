import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import type { Category, Project } from '../types/portfolio';
import { LayoutGrid, Smartphone, Box, Gamepad2, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
}

const cardSpring = { type: 'spring', stiffness: 260, damping: 28 } as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme, onInspect }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.projects.categories.all, icon: <LayoutGrid size={15} /> },
    { id: 'mobile', label: t.projects.categories.mobile, icon: <Smartphone size={15} /> },
    { id: 'web-3d', label: t.projects.categories.web3d, icon: <Box size={15} /> },
    { id: 'games', label: t.projects.categories.games, icon: <Gamepad2 size={15} /> }
  ];

  const countFor = (id: Category) =>
    id === 'all' ? projectsData.length : projectsData.filter((p) => p.category === id).length;

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' ||
      p.category === activeCategory ||
      (activeCategory === 'games' && p.id === 'numbers-game') ||
      (activeCategory === 'mobile' && p.id === 'numbers-game');
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
        <Reveal className="section-header">
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
                aria-label={t.projects.searchPlaceholder}
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

            {/* The gradient pill is one shared element that glides between tabs */}
            <div className="category-filter-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`filter-btn ${isActive ? 'active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={`filter-pill-${language}`}
                        className="filter-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="filter-btn-content">
                      {cat.icon}
                      <span>{cat.label}</span>
                      <span className="filter-count">{countFor(cat.id)}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {searchQuery && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {t.projects.showingResults(filteredProjects.length, projectsData.length, searchQuery)}
              </p>
            )}
          </div>
        </Reveal>

        {filteredProjects.length === 0 && (
          <motion.div
            className="no-projects-box glass-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
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
          </motion.div>
        )}

        {/* Cards animate out, in, and into their new grid slots whenever the filter changes */}
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout="position"
                className="project-cell"
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, transition: { ...cardSpring, delay: (index % 3) * 0.08 } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={cardSpring}
              >
                <ProjectCard project={project} theme={theme} onInspect={onInspect} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
