import type { Project, Skill } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'motrilog',
    title: 'MotriLog',
    category: 'web-3d',
    is3dInteractive: true,
    tags: [
      { text: 'Python', color: 'default' },
      { text: 'Smart Maintenance', color: 'default' },
      { text: 'Three.js WebGL 3D', color: 'cyan' },
      { text: 'GitHub', color: 'default' }
    ],
    summary: 'Smart vehicle maintenance platform with real-time 3D interactive car telemetry to track service records, predict repair schedules, and monitor live vehicle health.',
    image: '/assets/images/project_motrilog_3d.jpg',
    links: [
      { label: 'View on GitHub ↗', url: 'https://github.com/Ma16q/MotriLog', type: 'launch' }
    ]
  },
  {
    id: 'ghos',
    title: 'ghos (GameHub Store)',
    category: 'web-3d',
    tags: [
      { text: 'E-Commerce', color: 'pink' },
      { text: 'Live Store', color: 'pink' },
      { text: 'Gaming', color: 'default' }
    ],
    summary: 'Live online gaming storefront and digital products hub for gaming enthusiasts.',
    image: '/assets/images/project_ghos.jpg',
    links: [
      { label: 'Live Website (ghos.shop) ↗', url: 'https://ghos.shop', type: 'launch' },
      { label: 'Repo ↗', url: 'https://github.com/Ma16q/ghos', type: 'outline' }
    ]
  },
  {
    id: 'sunan',
    title: 'مستحبات السنن',
    category: 'mobile',
    isGooglePlay: true,
    appIcon: '/assets/images/icon_sunan.png',
    badge: '⭐ 4.9 • Islamic Habits',
    tags: [
      { text: 'Android', color: 'green' },
      { text: 'Java', color: 'green' },
      { text: '📱 Google Play', color: 'green' }
    ],
    summary: 'Published Android app on Google Play — Islamic Sunnah habits & manners tracker with modern UI and custom reading themes. Built with Android Studio & Java.',
    links: [
      { label: 'View on Google Play ↗', url: 'https://play.google.com/store/apps/details?id=com.mustahabbat.sunan', type: 'google-play' }
    ]
  },
  {
    id: 'musbihati',
    title: 'مسبحتي',
    category: 'mobile',
    isGooglePlay: true,
    appIcon: '/assets/images/icon_musbihati.png',
    badge: '📿 Digital Tasbih Counter',
    tags: [
      { text: 'Android', color: 'green' },
      { text: 'Java', color: 'green' },
      { text: '📱 Google Play', color: 'green' }
    ],
    summary: 'Published Android app on Google Play — Smart digital tasbih & dhikr counter simulated as a portable tally ring device. Built with Android Studio & Java.',
    links: [
      { label: 'View on Google Play ↗', url: 'https://play.google.com/store/apps/details?id=com.musbihati', type: 'google-play' }
    ]
  },
  {
    id: 'numbers-game',
    title: 'Numbers-Game',
    category: 'games',
    tags: [
      { text: 'Java', color: 'default' },
      { text: 'OOP', color: 'default' },
      { text: 'Game Logic', color: 'default' }
    ],
    summary: 'Interactive numeric challenge game built with Java logic and object-oriented architecture.',
    image: '/assets/images/project_numbers.jpg',
    links: [
      { label: 'View on GitHub ↗', url: 'https://github.com/Ma16q/Numbers-Game', type: 'launch' }
    ]
  },
  {
    id: 'my-first-react',
    title: 'My-First-React',
    category: 'web-3d',
    tags: [
      { text: 'React', color: 'pink' },
      { text: 'JavaScript', color: 'default' },
      { text: 'Frontend', color: 'default' }
    ],
    summary: 'Interactive React playground exploring modern component hierarchy and state management.',
    image: '/assets/images/project_react.jpg',
    links: [
      { label: 'View on GitHub ↗', url: 'https://github.com/Ma16q/My-First-React', type: 'launch' }
    ]
  },
  {
    id: 'game-ranking',
    title: 'Game Ranking Project',
    category: 'games',
    tags: [
      { text: 'HTML5', color: 'default' },
      { text: 'Gaming', color: 'default' }
    ],
    summary: 'Top 3 games of all time: Ark: Survival Evolved, Kingdom Come: Deliverance II, and Elden Ring.',
    image: '/assets/images/ga.png',
    links: [
      { label: 'Open Project ↗', url: '/assets/Game Ranking Project.html', type: 'launch' }
    ]
  },
  {
    id: 'birthday-invite',
    title: 'Birthday Invite Project',
    category: 'web-3d',
    tags: [
      { text: 'HTML5', color: 'pink' },
      { text: 'IAU Location', color: 'pink' }
    ],
    summary: 'Celebration invite pinned at Imam Abdulrahman Bin Faisal University (IAU) with Google Maps coordinates.',
    image: '/assets/images/br.png',
    links: [
      { label: 'Open Project ↗', url: '/assets/Birthday Invite Project.html', type: 'launch' }
    ]
  }
];

export const skillsData: Skill[] = [
  { name: 'Python', icon: '🐍', category: 'languages' },
  { name: 'Java', icon: '☕', category: 'languages' },
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'TypeScript', icon: '📘', category: 'frontend' },
  { name: 'JavaScript', icon: '⚡', category: 'frontend' },
  { name: 'HTML5 / CSS3', icon: '🎨', category: 'frontend' },
  { name: 'Android Studio', icon: '🤖', category: 'mobile' },
  { name: 'Flutter (Learning)', icon: '📱', category: 'mobile' },
  { name: 'Three.js 3D WebGL', icon: '🎲', category: 'tools' },
  { name: 'Git & GitHub', icon: '🐙', category: 'tools' },
  { name: 'Google Cloud Platform', icon: '☁️', category: 'tools' },
  { name: 'Software Engineering', icon: '⚙️', category: 'tools' }
];
