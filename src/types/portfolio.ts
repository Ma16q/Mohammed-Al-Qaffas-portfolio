export type Category = 'all' | 'mobile' | 'web-3d' | 'games';

export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  category: Category;
  tags: { text: string; textAr?: string; color?: 'cyan' | 'pink' | 'green' | 'default' }[];
  summary: string;
  summaryAr?: string;
  image?: string;
  appIcon?: string;
  is3dInteractive?: boolean;
  isGooglePlay?: boolean;
  links: {
    label: string;
    labelAr?: string;
    url: string;
    type: 'launch' | 'outline' | 'google-play';
  }[];
  badge?: string;
  badgeAr?: string;
  highlights?: string[];
  highlightsAr?: string[];
  techStack?: string[];
}

export interface Skill {
  name: string;
  nameAr?: string;
  category: 'languages' | 'frontend' | 'mobile' | 'tools';
}
