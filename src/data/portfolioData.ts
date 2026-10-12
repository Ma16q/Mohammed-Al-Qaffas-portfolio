import type { Project, Skill } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'motrilog',
    title: 'MotriLog',
    titleAr: 'موتري لوج (MotriLog)',
    category: 'web-3d',
    is3dInteractive: true,
    tags: [
      { text: 'Python', textAr: 'بايثون', color: 'default' },
      { text: 'Smart Telemetry', textAr: 'تيليماتري ذكية', color: 'default' },
      { text: 'Three.js WebGL 3D', textAr: 'ثلاثي الأبعاد WebGL', color: 'cyan' },
      { text: 'GitHub', textAr: 'جيت هب', color: 'default' }
    ],
    summary: 'Smart vehicle maintenance platform with real-time 3D interactive car telemetry to track service records, predict repair schedules, and monitor live vehicle health.',
    summaryAr: 'منصة ذكية لصيانة المركبات مع محاكاة ثلاثية الأبعاد تفاعلية للسيارة وتتبع سجلات الخدمة وتنبؤ مواعيد الإصلاح ومراقبة صحة المحرك والإطارات.',
    image: '/assets/images/project_motrilog_3d.jpg',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/MotriLog', type: 'launch' }
    ],
    techStack: ['Python', 'Three.js', 'WebGL', 'GLTF/DRACO', 'CSS Glassmorphism', 'Telemetry Analytics'],
    highlights: [
      'Interactive 360° car orbit drag & real-time WebGL render loop',
      'Diagnostic wireframe telemetry inspection mode for engine and chassis',
      'Smart service prediction algorithm estimating oil and tire wear cycles',
      'Dynamic cyber neon paint customization with physical material shaders'
    ],
    highlightsAr: [
      'محاكاة مدارية 360 درجة للسيارة في بيئة WebGL واقعية وفائقة السلاسة',
      'وضع فحص التيليماتري الهيكلي والشعاعي للمحرك ونظام التعليق',
      'خوارزمية ذكية لتقدير دورات الصيانة الدورية وتآكل الإطارات والزيوت',
      'تخصيص ألوان الطلاء مباشرة مع معالجة الإضاءة الفيزيائية PBR'
    ]
  },
  {
    id: 'ghos',
    title: 'ghos (GameHub Store)',
    titleAr: 'متجر غوس للألعاب (ghos.shop)',
    category: 'web-3d',
    tags: [
      { text: 'E-Commerce', textAr: 'تجارة إلكترونية', color: 'pink' },
      { text: 'Production Store', textAr: 'متجر نشط', color: 'pink' },
      { text: 'Gaming', textAr: 'ألعاب رقمية', color: 'default' }
    ],
    summary: 'Live online gaming storefront and digital products hub for gaming enthusiasts with instant checkout and gaming deals.',
    summaryAr: 'متجر إلكتروني نشط لمنتجات وبطاقات الألعاب الرقمية مع واجهة مستخدم إلكترونية للشراء الفوري.',
    image: '/assets/images/project_ghos.jpg',
    links: [
      { label: 'Live Store (ghos.shop)', labelAr: 'المتجر المباشر (ghos.shop)', url: 'https://ghos.shop', type: 'launch' },
      { label: 'Source Repo', labelAr: 'الكود المصدري', url: 'https://github.com/Ma16q/ghos', type: 'outline' }
    ],
    techStack: ['E-Commerce Engine', 'JavaScript', 'CSS3', 'Payment Gateways', 'Digital Storefront'],
    highlights: [
      'Production deployment serving digital gaming titles and gear',
      'High-conversion cyber-aesthetic storefront with responsive catalog',
      'Streamlined digital delivery and cart management system'
    ],
    highlightsAr: [
      'نظام متجر إلكتروني منشور في بيئة الإنتاج لخدمة اللاعبين والمنتجات الرقمية',
      'تصميم متجاوب عالي التحويل بجماليات رقمية حديثة وسريعة الاستجابة',
      'نظام سلة مشتريات وتوصيل فوري للرموز الرقمية'
    ]
  },
  {
    id: 'sunan',
    title: 'Mustahabbat Al-Sunan',
    titleAr: 'مستحبات السنن',
    category: 'mobile',
    isGooglePlay: true,
    appIcon: '/assets/images/icon_sunan.png',
    badge: 'Official Google Play App',
    badgeAr: 'تطبيق رسمي على Google Play',
    tags: [
      { text: 'Android', textAr: 'أندرويد', color: 'green' },
      { text: 'Java SDK', textAr: 'جافا SDK', color: 'green' },
      { text: 'Google Play', textAr: 'قوقل بلاي', color: 'green' }
    ],
    summary: 'Published Android app on Google Play — Islamic Sunnah habits & manners tracker with modern UI and custom reading themes. Built with Android Studio & Java.',
    summaryAr: 'تطبيق أندرويد منشور رسمياً على متجر Google Play — لمتابعة السنن والأذكار اليومية بواجهات حديثة وأنماط قراءة مخصصة.',
    links: [
      { label: 'View on Google Play', labelAr: 'عرض على Google Play', url: 'https://play.google.com/store/apps/details?id=com.mustahabbat.sunan', type: 'google-play' }
    ],
    techStack: ['Android Studio', 'Java', 'Android SDK', 'Material Design', 'Google Play Store'],
    highlights: [
      'Published on Google Play Store with active users and 5-star ratings',
      'Comprehensive Islamic Sunnah habits catalog categorized by daily routines',
      'Custom reading modes, text zoom, and high-contrast night theme',
      'Native Android performance with zero latency and lightweight APK size'
    ],
    highlightsAr: [
      'منشور على متجر Google Play مع مستخدمين نشطين وتقييمات ممتازة',
      'فهرس شامل للأذكار والسنن مصنف حسب الأوقات والأنشطة اليومية',
      'أنماط قراءة مريحة مع تكبير الخط ووضع القراءة الليلي عالي التباين',
      'أداء أصيل Native بدون أي تأخير وحجم تطبيق خفيف وسريع التحميل'
    ]
  },
  {
    id: 'musbihati',
    title: 'Musbihati (Digital Tasbih)',
    titleAr: 'مسبحتي (خاتم التسبيح الذكي)',
    category: 'mobile',
    isGooglePlay: true,
    appIcon: '/assets/images/icon_musbihati.png',
    badge: 'Official Google Play App',
    badgeAr: 'تطبيق رسمي على Google Play',
    tags: [
      { text: 'Android', textAr: 'أندرويد', color: 'green' },
      { text: 'Java SDK', textAr: 'جافا SDK', color: 'green' },
      { text: 'Google Play', textAr: 'قوقل بلاي', color: 'green' }
    ],
    summary: 'Published Android app on Google Play — Smart digital tasbih & dhikr counter simulated as a portable tally ring device with haptic vibration feedback.',
    summaryAr: 'تطبيق أندرويد منشور رسمياً على متجر Google Play — محاكي رقمي لخاتم التسبيح الذكي مع اهتزاز لمسي وحفظ تلقائي للإحصائيات.',
    links: [
      { label: 'View on Google Play', labelAr: 'عرض على Google Play', url: 'https://play.google.com/store/apps/details?id=com.musbihati', type: 'google-play' }
    ],
    techStack: ['Android Studio', 'Java', 'Android SDK', 'Haptic Feedback', 'Google Play Store'],
    highlights: [
      'Published on Google Play Store with realistic tally ring physical simulation',
      'Haptic vibration feedback upon every count for screenless tasbih',
      'Persistent counter state saving across app reboots via Android SharedPreferences',
      'Multiple custom counter targets and Islamic dhikr presets'
    ],
    highlightsAr: [
      'منشور على متجر Google Play مع محاكاة فيزيائية واقعية لخاتم التسبيح',
      'تغذية لمسية Haptic Vibration عند كل نقرة للتسبيح دون الحاجة للنظر للشاشة',
      'حفظ دائم لحالة العداد حتى بعد إغلاق التطبيق عبر Android SharedPreferences',
      'أهداف مسبقة قابلة للتخصيص وقوائم للأذكار المتنوعة'
    ]
  },
  {
    id: 'numbers-game',
    title: 'Numbers Game Engine',
    titleAr: 'محرك لعبة الأرقام (Numbers-Game)',
    category: 'games',
    tags: [
      { text: 'Java', textAr: 'جافا', color: 'default' },
      { text: 'OOP Architecture', textAr: 'معمارية OOP', color: 'default' },
      { text: 'Game Logic', textAr: 'منطق اللعبة', color: 'default' }
    ],
    summary: 'Interactive numeric logic challenge game built with Java architecture and clean object-oriented patterns.',
    summaryAr: 'لعبة تفاعلية للتحدي الرقمي مبنية بلغة جافا مع معمارية برمجية كائنية التوجه OOP.',
    image: '/assets/images/project_numbers.jpg',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/Numbers-Game', type: 'launch' }
    ],
    techStack: ['Java', 'OOP Patterns', 'Algorithms', 'Score State Engine'],
    highlights: [
      'Object-oriented architecture separating game state, rules, and UI',
      'Dynamic numeric pattern challenge with progressive difficulty',
      'Score tracking and session analytics'
    ],
    highlightsAr: [
      'معمارية كائنية التوجه تفصل بين منطق اللعبة وحالة النقاط وواجهة التفاعل',
      'تحديات رقمية ديناميكية مع تصاعد تدريجي في الصعوبة',
      'نظام احتساب النقاط وإحصائيات الجلسات'
    ]
  },
  {
    id: 'my-first-react',
    title: 'Modern React Architecture',
    titleAr: 'تطبيق رياكت الحديث (My-First-React)',
    category: 'web-3d',
    tags: [
      { text: 'React', textAr: 'رياكت', color: 'pink' },
      { text: 'JavaScript', textAr: 'جافاسكريبت', color: 'default' },
      { text: 'Frontend System', textAr: 'واجهات أمامية', color: 'default' }
    ],
    summary: 'Interactive React laboratory exploring component hierarchy, hook state systems, and reactive UI patterns.',
    summaryAr: 'مشروع استكشافي لمعمارية React الحديثة، إدارة الحالة عبر الـ Hooks، وتصميم المكونات التفاعلية.',
    image: '/assets/images/project_react.jpg',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/My-First-React', type: 'launch' }
    ],
    techStack: ['React', 'JavaScript (ES6+)', 'CSS Modules', 'React Hooks'],
    highlights: [
      'Exploration of functional React components and custom hooks',
      'Dynamic state management and re-rendering optimizations',
      'Component-driven UI development foundation'
    ],
    highlightsAr: [
      'بناء مكونات وظيفية واستخدام الـ Custom Hooks لإدارة المنطق البرمجي',
      'إدارة ديناميكية للحالة وتحسين كفاءة إعادة التصيير Re-rendering',
      'تأسيس وتطبيق مفاهيم تطوير الواجهات القائمة على المكونات Reusable Components'
    ]
  },
  {
    id: 'game-ranking',
    title: 'Game Ranking Showcase',
    titleAr: 'معرض تصنيف الألعاب',
    category: 'games',
    tags: [
      { text: 'HTML5', textAr: 'HTML5', color: 'default' },
      { text: 'Gaming Curation', textAr: 'تقييم الألعاب', color: 'default' }
    ],
    summary: 'Curated gaming critique and architectural review of open-world masterpieces: Ark, Kingdom Come: Deliverance II, and Elden Ring.',
    summaryAr: 'استعراض تحليلي وتقييمي لأبرز تحف الألعاب في العوالم المفتوحة والـ RPG: Ark وKingdom Come II وElden Ring.',
    image: '/assets/images/ga.png',
    links: [
      { label: 'Open Project', labelAr: 'فتح المشروع', url: '/assets/Game Ranking Project.html', type: 'launch' }
    ],
    techStack: ['HTML5', 'Semantic Web', 'Game Reviews'],
    highlights: [
      'Curated review of open-world and RPG gaming masterpieces',
      'Clean HTML5 semantic hierarchy and visual media presentation'
    ],
    highlightsAr: [
      'مراجعة معمقة لأفضل ألعاب العالم المفتوح وتجارب تقمص الأدوار',
      'بنية دلالية نظيفة بتقنيات HTML5 مع عرض وسائط مرئية متناسق'
    ]
  },
  {
    id: 'birthday-invite',
    title: 'University Event Invitation',
    titleAr: 'دعوة فعالية جامعية',
    category: 'web-3d',
    tags: [
      { text: 'HTML5', textAr: 'HTML5', color: 'pink' },
      { text: 'IAU Coordinates', textAr: 'موقع جامعة IAU', color: 'pink' }
    ],
    summary: 'Celebration invite pinned at Imam Abdulrahman Bin Faisal University (IAU) campus with interactive Google Maps integration.',
    summaryAr: 'بطاقة دعوة رقمية محددة بمقر جامعة الإمام عبد الرحمن بن فيصل مع ربط مباشر بإحداثيات خرائط جوجل.',
    image: '/assets/images/br.png',
    links: [
      { label: 'Open Project', labelAr: 'فتح المشروع', url: '/assets/Birthday Invite Project.html', type: 'launch' }
    ],
    techStack: ['HTML5', 'Google Maps API', 'Event Planning'],
    highlights: [
      'Location coordinates linked directly to IAU University campus in Dammam',
      'Creative responsive event invite card design'
    ],
    highlightsAr: [
      'ربط جغرافي مباشر مع حرم جامعة الإمام عبد الرحمن بن فيصل بالدمام',
      'تصميم بطاقة دعوة متجاوب وأنيق'
    ]
  }
];

export const skillsData: Skill[] = [
  { name: 'Python', nameAr: 'بايثون', category: 'languages' },
  { name: 'Java SDK', nameAr: 'جافا SDK', category: 'languages' },
  { name: 'React 19', nameAr: 'رياكت 19', category: 'frontend' },
  { name: 'TypeScript', nameAr: 'تايب سكريبت', category: 'frontend' },
  { name: 'JavaScript (ES6+)', nameAr: 'جافاسكريبت', category: 'frontend' },
  { name: 'HTML5 & Modern CSS', nameAr: 'HTML5 وتقنيات CSS الحديثة', category: 'frontend' },
  { name: 'Android Studio', nameAr: 'أندرويد ستوديو', category: 'mobile' },
  { name: 'Flutter & Dart', nameAr: 'فلاتر ودارت', category: 'mobile' },
  { name: 'Three.js & WebGL 3D', nameAr: 'Three.js و WebGL ثلاثي الأبعاد', category: 'tools' },
  { name: 'Git & Version Control', nameAr: 'Git وإدارة الإصدارات', category: 'tools' },
  { name: 'Google Cloud Platform (GCP)', nameAr: 'منصة قوقل السحابية GCP', category: 'tools' },
  { name: 'Software Architecture', nameAr: 'هندسة ومعمارية البرمجيات', category: 'tools' }
];
