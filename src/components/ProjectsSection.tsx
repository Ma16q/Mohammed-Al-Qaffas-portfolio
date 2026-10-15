import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import type { Category, Project } from '../types/portfolio';
import { LayoutGrid, Smartphone, Box, Gamepad2, Search, X, ExternalLink, Filter } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
  onInspect?: (project: Project) => void;
  skillFilter?: string | null;
  onClearSkillFilter?: () => void;
}

const cardSpring = { type: 'spring', stiffness: 260, damping: 28 } as const;

export const matchKeyword = (text: string, kw: string): boolean => {
  if (!text || !kw) return false;
  const cleanKw = kw.trim().toLowerCase();
  if (!cleanKw) return false;

  // 'java' should strictly match the word 'java', not 'javascript'
  if (cleanKw === 'java') {
    return /(^|[^a-zA-Z0-9])java([^a-zA-Z0-9]|$)/i.test(text);
  }

  // Short alphanumeric tokens (<= 4 chars) match as discrete words
  if (cleanKw.length <= 4 && /^[a-z0-9]+$/i.test(cleanKw)) {
    const reg = new RegExp(`(^|[^a-zA-Z0-9])${cleanKw}([^a-zA-Z0-9]|$)`, 'i');
    return reg.test(text);
  }

  return text.includes(cleanKw);
};

export const normalizeSkillKeywords = (raw: string): string[] => {
  const q = raw.trim().toLowerCase();
  const keywords: string[] = [q];

  // Tokenize words (length >= 3, skipping stop words)
  const tokens = q.split(/[\s,+/_\-]+/).filter((w) => w.length >= 3 && !['and', 'the', 'for', 'with'].includes(w));
  keywords.push(...tokens);

  // If query specifically targets Android Studio / Android
  if (q.includes('android studio') || q.includes('ستوديو') || q === 'studio') {
    keywords.push('android studio', 'android', 'أندرويد ستوديو', 'أندرويد', 'sunan', 'musbihati', 'numbers-game');
  } else if (
    q.includes('mobile') ||
    q.includes('جوال') ||
    q.includes('هواتف') ||
    q.includes('تطبيقات') ||
    q.includes('android') ||
    q.includes('أندرويد')
  ) {
    keywords.push('mobile', 'android', 'sunan', 'musbihati', 'numbers-game', 'جوال', 'أندرويد');
  }

  if (q.includes('game') || q.includes('ألعاب') || q.includes('لعب')) {
    keywords.push('game', 'games', 'numbers-game', 'ghos', 'ألعاب', 'لعبة');
  }
  if (q.includes('python') || q.includes('بايثون')) {
    keywords.push('python', 'flask', 'بايثون', 'motrilog');
  }
  // Only push java if user explicitly queried java or جافا
  if (q.includes('java') || q.includes('جافا')) {
    keywords.push('java', 'sunan', 'musbihati', 'numbers-game', 'جافا');
  }
  if (q.includes('react') || q.includes('رياكت')) {
    keywords.push('react', 'رياكت');
  }
  if (q.includes('three') || q.includes('webgl') || q.includes('3d') || q.includes('ثلاثي')) {
    keywords.push('three', 'webgl', '3d', 'motrilog');
  }
  if (q.includes('php') || q.includes('ghos') || q.includes('commerce') || q.includes('تجارة')) {
    keywords.push('php', 'ghos', 'mysql', 'متجر');
  }
  if (q.includes('javascript') || q.includes('جافاسكريبت') || q.includes('js')) {
    keywords.push('javascript', 'js', 'جافاسكريبت');
  }
  if (q.includes('typescript') || q.includes('تايب سكريبت') || q.includes('تايب') || q === 'ts') {
    keywords.push('typescript', 'تايب سكريبت', 'تايب', 'ts', 'capsule-tahawul');
  }
  if (q.includes('tailwind') || q.includes('تيلويند')) {
    keywords.push('tailwind', 'تيلويند', 'capsule-tahawul');
  }
  if (q.includes('css') || q.includes('html')) {
    keywords.push('css', 'html');
  }
  if (q.includes('swe') || q.includes('software engineering') || q.includes('architecture') || q.includes('هندسة')) {
    keywords.push('software', 'motrilog', 'engineering', 'هندسة');
  }
  if (q.includes('telemetry') || q.includes('تيليماتري')) {
    keywords.push('telemetry', 'motrilog', '3d');
  }

  return Array.from(new Set(keywords));
};

export const getGithubSearchQuery = (raw: string): string => {
  const q = raw.trim().toLowerCase();
  if (q.includes('python') || q.includes('بايثون')) return 'python';
  if (q.includes('java') || q.includes('جافا')) return 'java';
  if (q.includes('react') || q.includes('رياكت')) return 'react';
  if (q.includes('android') || q.includes('أندرويد')) return 'android';
  if (q.includes('mobile') || q.includes('جوال')) return 'mobile';
  if (q.includes('game') || q.includes('لعب') || q.includes('ألعاب')) return 'game';
  if (q.includes('three') || q.includes('webgl') || q.includes('3d')) return 'three';
  if (q.includes('typescript') || q.includes('تايب')) return 'typescript';
  if (q.includes('javascript') || q.includes('جافاسكريبت')) return 'javascript';
  if (q.includes('gcp') || q.includes('google cloud') || q.includes('سحابية') || q.includes('cloud')) return 'cloud';
  if (q.includes('git') || q.includes('إصدارات')) return 'git';
  if (q.includes('database') || q.includes('بيانات') || q.includes('sql') || q.includes('mongo')) return 'database';
  if (q.includes('data structures') || q.includes('algorithms') || q.includes('خوارزميات')) return 'algorithm';
  if (q.includes('oop')) return 'oop';
  if (q.includes('telemetry') || q.includes('تيليماتري')) return 'telemetry';
  return raw.replace(/[^a-zA-Z0-9\s_-]/g, '').trim() || raw;
};

export const getGithubRepositoryUrl = (raw: string): string => {
  const q = raw.trim().toLowerCase();
  if (q.includes('android') || q.includes('أندرويد') || q.includes('mobile') || q.includes('جوال')) {
    return 'https://github.com/Ma16q?tab=repositories&q=Numbers';
  }
  if (q.includes('game') || q.includes('لعب') || q.includes('ألعاب')) {
    return 'https://github.com/Ma16q?tab=repositories&q=Game';
  }
  if (q.includes('motrilog') || q.includes('موتري') || q.includes('car') || q.includes('swe') || q.includes('telemetry') || q.includes('3d') || q.includes('three')) {
    return 'https://github.com/Ma16q?tab=repositories&q=MotriLog';
  }
  if (q.includes('ghos') || q.includes('غوس') || q.includes('store') || q.includes('php') || q.includes('commerce') || q.includes('تجارة')) {
    return 'https://github.com/Ma16q?tab=repositories&q=ghos';
  }
  if (q.includes('react') || q.includes('رياكت')) {
    return 'https://github.com/Ma16q?tab=repositories&q=React';
  }
  if (q.includes('html') || q.includes('css')) {
    return 'https://github.com/Ma16q?tab=repositories&q=HTML';
  }
  if (q.includes('java') || q.includes('جافا')) {
    return 'https://github.com/Ma16q?tab=repositories&language=java';
  }
  if (q.includes('python') || q.includes('بايثون')) {
    return 'https://github.com/Ma16q?tab=repositories&language=python';
  }
  const clean = getGithubSearchQuery(raw);
  return `https://github.com/Ma16q?tab=repositories&q=${encodeURIComponent(clean)}`;
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme,
  onInspect,
  skillFilter,
  onClearSkillFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

  useEffect(() => {
    if (skillFilter) {
      setSearchQuery(skillFilter);
      setActiveCategory('all');
    }
  }, [skillFilter]);

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.projects.categories.all, icon: <LayoutGrid size={15} /> },
    { id: 'mobile', label: t.projects.categories.mobile, icon: <Smartphone size={15} /> },
    { id: 'web-3d', label: t.projects.categories.web3d, icon: <Box size={15} /> },
    { id: 'games', label: t.projects.categories.games, icon: <Gamepad2 size={15} /> }
  ];

  const countFor = (id: Category) => {
    if (id === 'all') return projectsData.length;
    if (id === 'games') {
      return projectsData.filter((p) => p.category === 'games' || p.id === 'numbers-game').length;
    }
    if (id === 'mobile') {
      return projectsData.filter((p) => p.category === 'mobile' || p.id === 'numbers-game').length;
    }
    return projectsData.filter((p) => p.category === id).length;
  };

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' ||
      p.category === activeCategory ||
      (activeCategory === 'games' && p.id === 'numbers-game') ||
      (activeCategory === 'mobile' && p.id === 'numbers-game');

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const keywords = normalizeSkillKeywords(query);

    const searchableText = [
      p.id,
      p.category,
      p.category === 'mobile' ? 'mobile android جوال أندرويد تطبيقات' : '',
      p.category === 'games' || p.id === 'numbers-game' ? 'game games ألعاب لعبة' : '',
      p.title,
      p.titleAr || '',
      p.summary,
      p.summaryAr || '',
      ...(p.tags.map((t) => `${t.text} ${t.textAr || ''}`)),
      ...(p.techStack || []),
      ...(p.highlights || []),
      ...(p.highlightsAr || [])
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = keywords.some((k) => matchKeyword(searchableText, k));

    return matchesCategory && matchesQuery;
  });

  const handleClear = () => {
    setSearchQuery('');
    onClearSkillFilter?.();
  };

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
                  onClick={handleClear}
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

            {/* Active Skill Filter Banner with Direct GitHub Bridge */}
            {searchQuery && (
              <motion.div
                className="active-skill-filter-banner"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="skill-filter-chip">
                  <Filter size={13} style={{ color: 'var(--accent-cyan)' }} />
                  <span>{t.projects.filteredBySkill(searchQuery)}</span>
                  <button
                    type="button"
                    className="clear-skill-chip-btn"
                    onClick={handleClear}
                    title="Remove filter"
                    aria-label="Remove filter"
                  >
                    <X size={12} />
                  </button>
                </div>

                <a
                  href={getGithubRepositoryUrl(searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skill-github-link-btn"
                  title={t.projects.viewSkillOnGithub(searchQuery)}
                >
                  <GithubIcon size={14} />
                  <span>{t.projects.viewSkillOnGithub(searchQuery)}</span>
                  <ExternalLink size={12} />
                </a>
              </motion.div>
            )}
          </div>
        </Reveal>

        {/* When no projects match in the portfolio: GitHub Bridge Hub Card */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="github-bridge-card glass-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="github-bridge-icon-wrap">
              <GithubIcon size={34} />
            </div>
            <div className="github-bridge-body">
              <span className="github-bridge-kicker">GitHub Repositories Hub</span>
              <h3 className="github-bridge-title">{t.projects.skillOnGithubOnlyTitle}</h3>
              <p className="github-bridge-desc">
                {t.projects.skillOnGithubOnlyDesc(searchQuery || '')}
              </p>
              <div className="github-bridge-actions">
                <a
                  href={getGithubRepositoryUrl(searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary github-bridge-btn"
                >
                  <GithubIcon size={16} />
                  <span>{t.projects.exploreGithubSkillBtn}</span>
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    handleClear();
                    setActiveCategory('all');
                  }}
                >
                  {t.projects.resetFilters}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cards animate out, in, and into their new grid slots whenever the filter changes */}
        {filteredProjects.length > 0 && (
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
                  <ProjectCard
                    project={project}
                    theme={theme}
                    onInspect={onInspect}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
