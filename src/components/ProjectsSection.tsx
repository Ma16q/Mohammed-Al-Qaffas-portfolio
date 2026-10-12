import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import type { Category } from '../types/portfolio';
import { LayoutGrid, Smartphone, Box, Gamepad2 } from 'lucide-react';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
}

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Projects', icon: <LayoutGrid size={15} /> },
  { id: 'mobile', label: 'Mobile Apps (Google Play)', icon: <Smartphone size={15} /> },
  { id: 'web-3d', label: '3D & Web Apps', icon: <Box size={15} /> },
  { id: 'games', label: 'Games & OOP', icon: <Gamepad2 size={15} /> }
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">Interactive Showcase</span>
          <h2 className="section-title">Projects & Published Apps</h2>
          <p className="section-desc">
            Explore live production apps on Google Play, interactive 3D WebGL car telemetry, and full-stack projects.
          </p>

          {/* Interactive React Filter Tabs */}
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
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};
