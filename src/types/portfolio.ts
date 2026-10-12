export type Category = 'all' | 'mobile' | 'web-3d' | 'games';

export interface Project {
  id: string;
  title: string;
  category: Category;
  tags: { text: string; color?: 'cyan' | 'pink' | 'green' | 'default' }[];
  summary: string;
  image?: string;
  appIcon?: string;
  is3dInteractive?: boolean;
  isGooglePlay?: boolean;
  links: {
    label: string;
    url: string;
    type: 'launch' | 'outline' | 'google-play';
  }[];
  badge?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'languages' | 'frontend' | 'mobile' | 'tools';
}
