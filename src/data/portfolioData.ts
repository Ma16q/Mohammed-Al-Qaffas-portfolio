import type { Project, Skill } from '../types/portfolio';

export interface ExperienceItem {
  id: string;
  role: string;
  roleAr: string;
  organization: string;
  organizationAr: string;
  period: string;
  periodAr: string;
  description: string;
  descriptionAr: string;
  tags: string[];
}

export const projectsData: Project[] = [
  {
    id: 'capsule-tahawul',
    title: 'Capsule Tahawul',
    titleAr: 'منصة كبسولة تحول (Capsule Tahawul)',
    category: 'web-3d',
    tags: [
      { text: 'React 19', textAr: 'رياكت 19', color: 'cyan' },
      { text: 'TypeScript', textAr: 'تايب سكريبت', color: 'cyan' },
      { text: 'Tailwind CSS v4', textAr: 'تيلويند v4', color: 'pink' },
      { text: 'Recharts', textAr: 'تحليلات بيانية', color: 'default' },
      { text: 'Learning Platform', textAr: 'منصة تعليمية وتدريبية', color: 'cyan' }
    ],
    summary: 'Full-featured interactive EdTech training platform & learning marketplace built with React 19, TypeScript, Tailwind CSS 4, and Recharts. Features dynamic course catalogues with deep filtering, student learning analytics dashboards, multi-role auth, and complete enrollment & payment checkout flows.',
    summaryAr: 'منصة تدريبية وتعليمية تفاعلية متكاملة تهدف إلى تمكين الكفاءات وتطوير المهارات التقنية وسد الفجوة مع سوق العمل. مبنية بأحدث معمارية React 19 و TypeScript وتيلويند 4، وتتضمن لوحة تحكم بيانية تفاعلية (Recharts)، كتالوج دورات متقدم، وبوابات دفع وتسجيل متكاملة.',
    image: '/assets/images/project_capsule_platform.png',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/capsuletahawul/team_c', type: 'launch' }
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Recharts', 'React Router v8', 'Context API', 'Role-Based Access Control', 'Vite', 'Oxlint'],
    highlights: [
      'Comprehensive course & bootcamp catalogue with dynamic multi-criteria category filtering',
      'Interactive student analytics dashboard powered by Recharts visualizing learning progress, study hours, and certifications',
      'End-to-end checkout & payment system featuring order summary, multi-step billing forms, and promo validation',
      'Role-Based Access Control (RBAC) architecture separating student, trainer, and administrator workflows',
      'Modern responsive UI engineered with Tailwind CSS v4 and localized layout support'
    ],
    highlightsAr: [
      'كتالوج شامل للدورات والمعسكرات التدريبية مع نظام تصفية وبحث متقدم متعدد المعايير',
      'لوحة تحكم وتحليلات بيانية تفاعلية مدعومة بمكتبة Recharts لمتابعة تقدم المتعلم وساعاته التدريبية',
      'دورة دفع وتسجيل متكاملة تشمل ملخص الطلب، نماذج الدفع الإلكتروني، وتأكيد الاشتراكات',
      'معمارية إدارة صلاحيات متعددة (RBAC) تفصل تجارب الطلاب والمدربين وإدارة المنصة',
      'واجهات عصرية فائقة الاستجابة مبنية بـ Tailwind CSS 4 تدعم الوضعين والتنقل السلس'
    ]
  },
  {
    id: 'motrilog',
    title: 'MotriLog',
    titleAr: 'موتري لوج (MotriLog)',
    category: 'web-3d',
    tags: [
      { text: 'Python & Flask', textAr: 'بايثون وفلاسك', color: 'default' },
      { text: 'Docker Compose', textAr: 'دوكر كومبوز', color: 'default' },
      { text: 'MongoDB', textAr: 'مونغو دي بي', color: 'default' },
      { text: 'Leaflet Maps', textAr: 'خرائط Leaflet', color: 'default' },
      { text: 'SWE Platform', textAr: 'مشروع هندسة برمجيات', color: 'cyan' }
    ],
    summary: 'Software Engineering (SWE) Course Project — Smart vehicle maintenance platform engineered with Python/Flask, MongoDB, and Docker Compose. Features predictive maintenance algorithms (oil & service cycles), and an interactive workshop locator via Leaflet.js & OpenStreetMap.',
    summaryAr: 'مشروع مادة هندسة البرمجيات (SWE) — منصة ذكية لصيانة وتتبع سجلات المركبات مبنية بـ Python و Flask و Docker و MongoDB. تتضمن خوارزميات ذكية للتنبؤ بمواعيد الصيانة الدورية، وخريطة تفاعلية لتحديد ورش الإصلاح القريبة عبر Leaflet.js و OpenStreetMap.',
    image: '/assets/images/project_motrilog_card.png',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/MotriLog', type: 'launch' }
    ],
    techStack: ['Python 3.9+', 'Flask', 'MongoDB', 'Docker & Compose', 'Leaflet.js', 'OpenStreetMap', 'REST APIs', 'Telegram Bot Service'],
    highlights: [
      'Comprehensive vehicle maintenance log history & scheduled service tracking',
      'Predictive service algorithm estimating oil life, brake wear, and inspection intervals',
      'Interactive nearby workshop locator utilizing Leaflet.js and OpenStreetMap without paid API dependencies',
      'Synchronized multi-container deployment architecture via Docker Compose & MongoDB',
      'Telegram bot integration for instant maintenance alerts and reminder notifications'
    ],
    highlightsAr: [
      'سجل شامل لتوثيق وتتبع عمليات الصيانة الدورية والفحص الفني للمركبة',
      'خوارزمية ذكية للتنبؤ باحتياجات ومواعيد الصيانة الدورية (تغيير الزيوت، استهلاك الفرامل، والفحص القادم)',
      'خريطة تفاعلية لتحديد مواقع ورش ومراكز الصيانة القريبة باستخدام Leaflet.js و OpenStreetMap',
      'معمارية حاويات معيارية متكاملة عبر Docker Compose وقاعدة بيانات MongoDB',
      'ربط مع خدمة Telegram Bot لإرسال تنبيهات الصيانة والإشعارات الفورية للمستخدم'
    ]
  },
  {
    id: 'ghos',
    title: 'ghos (GameHub Store)',
    titleAr: 'متجر غوس للألعاب (ghos)',
    category: 'web-3d',
    tags: [
      { text: 'E-Commerce', textAr: 'تجارة إلكترونية', color: 'pink' },
      { text: 'PHP & MySQL', textAr: 'PHP وقواعد MySQL', color: 'default' },
      { text: '2FA Security', textAr: 'أمان ومصادقة 2FA', color: 'pink' },
      { text: 'Resend API', textAr: 'خدمة البريد Resend', color: 'default' }
    ],
    summary: 'Production digital game keys e-commerce storefront (ghos.shop) featuring multi-mode authentication with 2FA, dual-email account security verification, timed 6-digit password resets, and session-persistent carts.',
    summaryAr: 'متجر إلكتروني حي ومتكامل لبطاقات ومفاتيح الألعاب الرقمية (ghos.shop) يتميز بنظام مصادقة ثنائية (2FA)، حماية الحسابات بالتحقق المزدوج من البريد، ورموز استعادة مؤقتة، وسلة مشتريات ذكية تنقل الجلسات تلقائياً.',
    image: '/assets/images/project_ghos_storefront.png',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/ghos', type: 'launch' }
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'CSS3', 'Resend API', '2FA Engine', 'Apache'],
    highlights: [
      'Production deployment serving digital gaming titles, gift cards, and game keys',
      'Two-Factor Authentication (2FA) via email and timed 6-digit verification codes for password reset',
      'Dual-Email security verification requiring confirmation from old and new emails to prevent account hijacking',
      'Session-persistent shopping cart automatically transferred upon guest-to-user login',
      'Role-Based Access Control (RBAC) dashboard for customers, merchants, and administrators'
    ],
    highlightsAr: [
      'نظام متجر إلكتروني منشور في بيئة الإنتاج لخدمة اللاعبين والمنتجات الرقمية ومفاتيح الألعاب',
      'نظام مصادقة ثنائية 2FA عبر البريد الإلكتروني مع رموز استعادة مؤقتة مكونة من 6 أرقام',
      'حماية أمنية متقدمة بالتحقق المزدوج من البريدين القديم والجديد عند تعديل الحساب لمنع الاختراق',
      'سلة مشتريات ذكية تحفظ جلسات الزوار وتدمجها تلقائياً عند تسجيل الدخول',
      'لوحة تحكم إدارية وتجارية متقدمة بنظام الصلاحيات المتعددة (RBAC) للمستخدمين والتجار والمسؤولين'
    ]
  },
  {
    id: 'sunan',
    title: 'Mustahabbat Wa Sunan',
    titleAr: 'مستحبات وسنن',
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
    summary: 'Published Android app on Google Play — Comprehensive Islamic Sunnah habits & daily manners tracker categorized by daily routines with custom reading themes. Built natively with Android Studio & Java.',
    summaryAr: 'تطبيق أندرويد منشور رسمياً على متجر Google Play — دليل شامل لإحياء سنن وآداب ومستحبات النبي ﷺ اليومية، مصنفة ومنظمة لتناسب الروتين اليومي للمسلم بواجهات مريحة وقراءة ليلية.',
    links: [
      { label: 'View on Google Play', labelAr: 'عرض على Google Play', url: 'https://play.google.com/store/apps/details?id=com.mustahabbat.sunan', type: 'google-play' }
    ],
    techStack: ['Android Studio', 'Java SDK', 'Material Design', 'Android XML', 'Google Play Store'],
    highlights: [
      'Published on Google Play Store with active users and 5-star ratings',
      'Comprehensive Islamic Sunnah habits catalog categorized by daily routines and occasions',
      'Comfortable reading mode with scalable typography and high-contrast night theme',
      'Native Android performance with zero latency and lightweight APK size'
    ],
    highlightsAr: [
      'منشور رسمياً على متجر Google Play مع مستخدمين نشطين وتقييمات ممتازة',
      'فهرس منظم وشامل للسنن والمستحبات النبوية مقسمة حسب الأوقات والأنشطة اليومية',
      'أنماط قراءة مريحة مع إمكانية تكبير الخط ودعم كامل للوضع الليلي المريح للعين',
      'أداء أصيل Native Java يضمن سرعة واستجابة فورية وحجماً تطبيقياً خفيفاً جداً'
    ]
  },
  {
    id: 'musbihati',
    title: 'Musbihati',
    titleAr: 'مسبحتي',
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
    summary: 'Published Android app on Google Play — Lightweight digital tasbih & dhikr counter simulated as a portable tally ring device with haptic vibration feedback and persistent count state.',
    summaryAr: 'تطبيق أندرويد منشور رسمياً على متجر Google Play — محاكاة ذكية لخاتم التسبيح الإلكتروني على الهاتف بحجم خفيف جداً، مع اهتزاز لمسي وحفظ تلقائي للإحصائيات والأذكار اليومية.',
    links: [
      { label: 'View on Google Play', labelAr: 'عرض على Google Play', url: 'https://play.google.com/store/apps/details?id=com.musbihati', type: 'google-play' }
    ],
    techStack: ['Android Studio', 'Java SDK', 'Haptic Feedback', 'SharedPreferences', 'Google Play Store'],
    highlights: [
      'Published on Google Play Store with realistic tally ring physical simulation',
      'Haptic vibration feedback upon every count for screenless tasbih remembrance',
      'Persistent counter state saving across app reboots via Android SharedPreferences',
      'Lightweight package footprint and immediate responsive performance'
    ],
    highlightsAr: [
      'منشور رسمياً على متجر Google Play بحجم خفيف جداً وأداء فائق السرعة',
      'محاكاة واقعية لخاتم التسبيح مع استجابة اهتزازية لمسية Haptic عند كل تسبيحة',
      'حفظ دائم لمجموع التسبيحات حتى بعد إعادة تشغيل الهاتف عبر SharedPreferences',
      'أذكار يومية مرتبة وسلسة تناسب البرنامج اليومي مع إمكانية تصفير أو مواصلة العداد'
    ]
  },
  {
    id: 'numbers-game',
    title: 'Numbers Game',
    titleAr: 'لعبة الأرقام (Numbers Game)',
    category: 'mobile',
    tags: [
      { text: 'Android', textAr: 'أندرويد', color: 'green' },
      { text: 'Java', textAr: 'جافا', color: 'default' },
      { text: 'Material 3', textAr: 'ماتيريال 3', color: 'cyan' },
      { text: 'Streak Engine', textAr: 'عداد الحماس 🔥', color: 'pink' }
    ],
    summary: 'Fast-paced Android game built with Java & modern Material 3 Design components. Players test quick-thinking reflexes by identifying and tapping the higher number card, featuring streak counters (🔥) and touch animations.',
    summaryAr: 'لعبة أندرويد تفاعلية سريعة مبنية بلغة Java ومكونات Material 3 Design الحديثة. يختبر اللاعبون سرعة بديهتهم باختيار الرقم الأكبر مع عداد الحماس المتتالي (Streak 🔥) وتغذية بصرية ولمسية تفاعلية.',
    image: '/assets/images/project_numbers_showcase.jpg',
    links: [
      { label: 'View on GitHub', labelAr: 'مستودع GitHub', url: 'https://github.com/Ma16q/Numbers-Game', type: 'launch' }
    ],
    techStack: ['Android Studio', 'Java SDK', 'Material 3 Components', 'ConstraintLayout', 'SharedPreferences', 'Gradle DSL'],
    highlights: [
      'Built natively for Android (API 24 to 37) utilizing Google Material 3 Design tokens',
      'Real-time score tracking, streak multiplier counter (🔥), and persistent high scores via SharedPreferences',
      'Tactile card touch animations with color-coded feedback (green for correct, red for wrong)',
      'Edge-to-edge system insets handling and fully localized in Arabic and English'
    ],
    highlightsAr: [
      'تطبيق أصيل لنظام أندرويد (API 24 إلى 37) مبني بمكونات وتصميم Material 3 الحديث',
      'احتساب فوري للنقاط مع عداد الحماس المتتالي (Streak 🔥) وحفظ تلقائي لأعلى رقم قياسي',
      'استجابة حركية تفاعلية للمس مع تغذية لونية (إطار أخضر للإجابة الصحيحة وأحمر للخاطئة)',
      'تصميم يمتد لكامل أطراف الشاشة (Edge-to-Edge) مع دعم ثنائي للغتين العربية والإنجليزية'
    ]
  },
  {
    id: 'my-first-react',
    title: 'My First React',
    titleAr: 'مشروعي الأول في رياكت (My First React)',
    category: 'web-3d',
    tags: [
      { text: 'React', textAr: 'رياكت', color: 'pink' },
      { text: 'JavaScript', textAr: 'جافاسكريبت', color: 'default' },
      { text: 'Frontend System', textAr: 'واجهات أمامية', color: 'default' }
    ],
    summary: 'Interactive React foundational laboratory exploring component hierarchy, hook state systems, and component-driven UI architecture.',
    summaryAr: 'مشروع استكشافي لمعمارية React الحديثة، إدارة الحالة عبر الـ Hooks، وتصميم المكونات التفاعلية القابلة لإعادة الاستخدام.',
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
  }
];

export const skillsData: Skill[] = [
  { name: 'Python', nameAr: 'بايثون', category: 'languages' },
  { name: 'Java SDK', nameAr: 'جافا SDK', category: 'languages' },
  { name: 'React 19', nameAr: 'رياكت 19', category: 'frontend' },
  { name: 'TypeScript', nameAr: 'تايب سكريبت', category: 'frontend' },
  { name: 'Tailwind CSS v4', nameAr: 'تيلويند CSS', category: 'frontend' },
  { name: 'JavaScript (ES6+)', nameAr: 'جافاسكريبت', category: 'frontend' },
  { name: 'HTML5 & Modern CSS', nameAr: 'HTML5 وتقنيات CSS الحديثة', category: 'frontend' },
  { name: 'Android Studio', nameAr: 'أندرويد ستوديو', category: 'mobile' },
  { name: 'Native Android (Java)', nameAr: 'تطوير أندرويد الأصيل (Java)', category: 'mobile' },
  { name: 'Three.js & WebGL 3D', nameAr: 'Three.js و WebGL ثلاثي الأبعاد', category: 'tools' },
  { name: 'Git & Version Control', nameAr: 'Git وإدارة الإصدارات', category: 'tools' },
  { name: 'Google Cloud Platform (GCP)', nameAr: 'منصة قوقل السحابية GCP', category: 'tools' },
  { name: 'Software Architecture', nameAr: 'هندسة ومعمارية البرمجيات', category: 'tools' }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'coop-training',
    role: 'Software Engineering Training (COOP / Field Internship)',
    roleAr: 'التدريب الميداني في هندسة وتطوير البرمجيات',
    organization: 'Computer Science Practical Internship Program',
    organizationAr: 'برنامج التدريب العملي الميداني لعلوم الحاسب',
    period: 'Completed / Recent Graduate',
    periodAr: 'مكتمل بنجاح',
    description: 'Successfully completed rigorous software engineering practical training covering native mobile app workflows, reactive web architecture, and full-stack software development.',
    descriptionAr: 'إتمام برنامج التدريب الميداني بنجاح، وتطبيق أحدث المعايير البرمجية في تطوير تطبيقات الجوال، وبرمجيات الويب التفاعلية، وإدارة دورة حياة الأنظمة البرمجية.',
    tags: ['Software Engineering', 'Android Development', 'Full-Stack Web', 'Git CI/CD']
  },
  {
    id: 'iau-degree',
    role: "Bachelor's in Computer Science",
    roleAr: 'بكالوريوس علوم الحاسب الآلي',
    organization: 'Imam Abdulrahman Bin Faisal University (IAU)',
    organizationAr: 'جامعة الإمام عبد الرحمن بن فيصل - كلية علوم الحاسب (CCSIT)',
    period: 'Eastern Province, Saudi Arabia',
    periodAr: 'الشرقية، المملكة العربية السعودية',
    description: 'Studying core Computer Science disciplines: Data Structures, Algorithms, Software Engineering, Database Systems, Object-Oriented Programming, and Web/Mobile Architectures.',
    descriptionAr: 'دراسة التخصصات الجوهرية: هياكل البيانات، الخوارزميات، هندسة البرمجيات، قواعد البيانات، البرمجة كائنية التوجه، وتطوير الأنظمة الموزعة والمحمولة.',
    tags: ['Data Structures', 'Algorithms', 'OOP', 'Databases', 'Computer Networks']
  },
  {
    id: 'gdg-campus',
    role: 'Google Developer Groups on Campus (GDG) Member',
    roleAr: 'عضو مجتمع مطوري جوجل الجامعي (GDG on Campus)',
    organization: 'GDG at IAU',
    organizationAr: 'مجتمع مطوري قوقل - جامعة الإمام عبد الرحمن بن فيصل',
    period: 'Active Tech Community Member',
    periodAr: 'عضو ومشارك تقني نشط',
    description: 'Active participant in Google technologies workshops, modern developer tooling sessions, and collaborative hackathons.',
    descriptionAr: 'المشاركة الفعالة في ورش العمل والفعاليات التقنية المتخصصة بأحدث تقنيات قوقل والحوسبة السحابية وأدوات التطوير الحديثة.',
    tags: ['Google Cloud', 'Web Dev', 'Mobile Technologies', 'Developer Community']
  },
  {
    id: 'hackathon',
    role: 'Industrial Hackathon Participant (Advanced Tech Track)',
    roleAr: 'مشارك في هاكاثون الصناعة (مسار التقنيات المتقدمة)',
    organization: 'ISE Club & Advanced Technology Track',
    organizationAr: 'نادي الهندسة الصناعية والأنظمة (ISE Club)',
    period: 'Advanced Technology Innovation',
    periodAr: 'ابتكار التقنيات المتقدمة',
    description: 'Engineered technological prototypes addressing industrial logistics and telemetry challenges under competitive hackathon timelines.',
    descriptionAr: 'بناء وتطوير نماذج برمجية وتقنية متقدمة لحل تحديات الرقمنة الصناعية والمتابعة اللوجستية ضمن فرق عمل تنافسية.',
    tags: ['Telemetry', 'Innovation Track', 'Prototyping', 'Team Engineering']
  }
];

