export type Language = 'en' | 'ar';

export interface Translations {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    github: string;
    cli: string;
    contactBtn: string;
    langToggle: string;
  };
  hero: {
    statusBadge: string;
    titleStart: string;
    titleGradient: string;
    titleEnd: string;
    subtitle: string;
    exploreBtn: string;
    openCliBtn: string;
    aboutBtn: string;
    statApps: string;
    statUni: string;
    stat3d: string;
    flipFrontTag: string;
    flipBackTag: string;
    flipShowReal: string;
    flipShow3d: string;
  };
  projects: {
    sectionPill: string;
    sectionTitle: string;
    sectionDesc: string;
    searchPlaceholder: string;
    showingResults: (count: number, total: number, q: string) => string;
    noResults: string;
    resetFilters: string;
    categories: {
      all: string;
      mobile: string;
      web3d: string;
      games: string;
    };
    inspectBtn: string;
    interactiveTab: string;
    hologramTab: string;
    hudBadge: string;
    appBadge: string;
    modalTitle: string;
    techStack: string;
    keyHighlights: string;
    closeModal: string;
  };
  about: {
    sectionPill: string;
    sectionTitle: string;
    name: string;
    uniText: string;
    hackathonText: string;
    githubBtn: string;
    linktreeBtn: string;
    skillsTitle: string;
    gamesTitle: string;
    gamesList: string;
  };
  contact: {
    sectionPill: string;
    sectionTitle: string;
    subtitle: string;
    emailLabel: string;
    copied: string;
    githubLabel: string;
    locationLabel: string;
    locationVal: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendBtn: string;
    sentSuccess: string;
  };
  terminal: {
    badge: string;
    title: string;
    welcomeMsg: string;
    typeHelp: string;
    inputPlaceholder: string;
    chips: {
      projects: string;
      skills: string;
      apps: string;
      bio: string;
      aiAcademic: string;
      car3d: string;
      contact: string;
      theme: string;
      clear: string;
    };
    secSqLi: string;
    secPromptInj: string;
    aiTitle: string;
  };
  footer: {
    copy: string;
    top: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About & Skills',
      contact: 'Contact',
      github: 'GitHub',
      cli: 'CLI Terminal',
      contactBtn: 'Say Hello',
      langToggle: 'العربية',
    },
    hero: {
      statusBadge: 'Available for Software Development & 3D Modeling Projects',
      titleStart: 'Software Engineering & Web Systems',
      titleGradient: '& 3D Modeler Specialist',
      titleEnd: '',
      subtitle: "Hi, I'm Mohamed Al-Qaffas (Ma16q) — Computer Science student at Imam Abdulrahman Bin Faisal University (IAU). Combining professional Full-Stack Software & Mobile Development with specialized 3D Modeling (Blender, WebGL & Three.js).",
      exploreBtn: 'Explore Projects',
      openCliBtn: 'Open Dev Terminal',
      aboutBtn: 'About & Skills',
      statApps: 'Google Play Apps',
      statUni: 'Saudi University',
      stat3d: '3D Modeler',
      flipFrontTag: '3D Avatar Model',
      flipBackTag: 'Mohamed Al-Qaffas (Personal Photo)',
      flipShowReal: 'View Personal Photo',
      flipShow3d: 'View 3D Avatar',
    },
    projects: {
      sectionPill: 'Interactive Engineering',
      sectionTitle: 'Projects & Published Applications',
      sectionDesc: 'Explore official production apps on Google Play, interactive 3D WebGL car telemetry, and full-stack software systems.',
      searchPlaceholder: 'Search projects, tags, or skills (e.g. Android, 3D, Python, Java)...',
      showingResults: (c, t, q) => `Showing ${c} of ${t} projects for "${q}"`,
      noResults: 'No projects match your search criteria.',
      resetFilters: 'Reset Filters',
      categories: {
        all: 'All Projects',
        mobile: 'Mobile Apps (Google Play)',
        web3d: '3D & Web Apps',
        games: 'Games & OOP Systems',
      },
      inspectBtn: 'Inspect Details',
      interactiveTab: '3D Interactive View',
      hologramTab: 'Telemetry HUD',
      hudBadge: '3D Telemetry HUD',
      appBadge: 'Google Play Application',
      modalTitle: 'Project Architecture & Inspection',
      techStack: 'Tech Stack & Engineering Tools',
      keyHighlights: 'Key Engineering Highlights',
      closeModal: 'Close',
    },
    about: {
      sectionPill: 'About & Competencies',
      sectionTitle: 'Profile & Engineering Stack',
      name: 'Mohamed Ahmed (Ma16q)',
      uniText: 'Undergraduate student at Imam Abdulrahman Bin Faisal University (IAU), Eastern Province, Kingdom of Saudi Arabia.',
      hackathonText: 'Participant in Industrial Hackathon (Advanced Technology Track with the ISE Club). Passionate about software tools, high-performance web systems, and responsive interfaces with clean code and glassmorphism styling.',
      githubBtn: 'GitHub Profile',
      linktreeBtn: 'Linktree Channels',
      skillsTitle: 'Technical Competencies',
      gamesTitle: 'Inspirational Games',
      gamesList: 'Ark: Survival Evolved • Kingdom Come: Deliverance II • Elden Ring',
    },
    contact: {
      sectionPill: 'Direct Collaboration',
      sectionTitle: "Let's Connect",
      subtitle: 'Feel free to reach out directly via email, GitHub, or through the contact form below.',
      emailLabel: 'Email (Click to copy)',
      copied: 'Copied to clipboard!',
      githubLabel: 'GitHub Developer Page',
      locationLabel: 'Campus / Location',
      locationVal: 'IAU Campus, Dammam, Eastern Province, Saudi Arabia',
      formName: 'Your Full Name',
      formEmail: 'Email Address',
      formMessage: 'Project Inquiry / Message',
      namePlaceholder: 'e.g. John Doe',
      emailPlaceholder: 'e.g. contact@example.com',
      messagePlaceholder: 'Describe your project or inquiry...',
      sendBtn: 'Send Message',
      sentSuccess: 'Message sent successfully! Thank you.',
    },
    terminal: {
      badge: 'Security Guard Active',
      title: 'bash + AI — mohamed@iau-workstation:~',
      welcomeMsg: 'Mohamed Ahmed (Ma16q) Developer Terminal & AI [v2.4.0]',
      typeHelp: 'Type help or مساعدة for commands, or select a shortcut chip below.',
      inputPlaceholder: 'Type command or inquiry (e.g. help, projects, skills)...',
      chips: {
        projects: 'Projects',
        skills: 'Skills',
        apps: 'Google Play',
        bio: 'About Mohamed',
        aiAcademic: 'Academic & Experience Profile',
        car3d: '3D WebGL Vehicle Features',
        contact: 'Contact Info',
        theme: 'Toggle Theme',
        clear: 'Clear Terminal',
      },
      secSqLi: '[SECURITY AUDIT] SQL Injection attempt detected and neutralized. Static client environment is immutable and SQL-free.',
      secPromptInj: '[SECURITY AUDIT] Prompt Injection / System Override blocked. Security constraints remain active and enforced.',
      aiTitle: 'Ma16q AI Engine:',
    },
    footer: {
      copy: `© ${new Date().getFullYear()} Mohamed Ahmed (Ma16q) • Imam Abdulrahman Bin Faisal University (IAU). All rights reserved.`,
      top: 'Back to Top',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      about: 'عن المطور والمهارات',
      contact: 'تواصل معي',
      github: 'حساب GitHub',
      cli: 'الطرفية CLI',
      contactBtn: 'تواصل الآن',
      langToggle: 'English',
    },
    hero: {
      statusBadge: 'متاح لمشاريع تطوير البرمجيات وتصميم النماذج ثلاثية الأبعاد',
      titleStart: 'هندسة وتطوير البرمجيات',
      titleGradient: 'وتصميم النماذج ثلاثية الأبعاد',
      titleEnd: '',
      subtitle: 'أهلاً بك، أنا محمد القفاص (Ma16q) — طالب علوم حاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU). أجمع بين خبرتي البرمجية كمطور برمجيات متكامل وتطبيقات أندرويد منشورة، وموهبتي المتخصصة كمصمم نماذج ثلاثية الأبعاد (3D Modeler).',
      exploreBtn: 'استكشف المشاريع',
      openCliBtn: 'فتح الطرفية الذكية',
      aboutBtn: 'المهارات والخبرات',
      statApps: 'تطبيقات Google Play',
      statUni: 'جامعة الإمام عبد الرحمن',
      stat3d: '3D Modeler',
      flipFrontTag: 'نموذج 3D ثلاثي الأبعاد',
      flipBackTag: 'محمد القفاص (صورة شخصية)',
      flipShowReal: 'عرض الصورة الشخصية',
      flipShow3d: 'عرض شخصية 3D',
    },
    projects: {
      sectionPill: 'معرض الأعمال البرمجية',
      sectionTitle: 'المشاريع والتطبيقات المنشورة',
      sectionDesc: 'استكشف التطبيقات المنشورة رسمياً على متجر Google Play، وتجارب سيارة 3D التفاعلية، والحلول البرمجية المتكاملة.',
      searchPlaceholder: 'ابحث عن مشروع، تقنية، أو لغة برمجة (مثال: Android, 3D, Python, Java)...',
      showingResults: (c, t, q) => `عرض ${c} من أصل ${t} مشاريع للبحث "${q}"`,
      noResults: 'لم يتم العثور على أي مشاريع تطابق بحثك.',
      resetFilters: 'إعادة ضبط التصفية',
      categories: {
        all: 'كافة المشاريع',
        mobile: 'تطبيقات الجوال (Google Play)',
        web3d: 'الويب وثلاثي الأبعاد',
        games: 'الألعاب والأنظمة البرمجية',
      },
      inspectBtn: 'فحص التفاصيل',
      interactiveTab: 'العرض التفاعلي 3D',
      hologramTab: 'شاشة البيانات HUD',
      hudBadge: 'بيانات التيليماتري 3D',
      appBadge: 'تطبيق رسمي على Google Play',
      modalTitle: 'فحص معمارية وتفاصيل المشروع',
      techStack: 'حزمة التقنيات وأدوات الهندسة',
      keyHighlights: 'أبرز الإنجازات والخصائص الهندسية',
      closeModal: 'إغلاق',
    },
    about: {
      sectionPill: 'عن المطور والقدرات',
      sectionTitle: 'النبذة والمهارات الهندسية',
      name: 'محمد أحمد (Ma16q)',
      uniText: 'طالب في جامعة الإمام عبد الرحمن بن فيصل (IAU) بالمنطقة الشرقية، المملكة العربية السعودية.',
      hackathonText: 'مشارك في هاكاثون الصناعة (مسار التقنيات المتقدمة مع نادي الهندسة الصناعية). متخصص في تطوير الأدوات البرمجية، وتطبيقات الويب عالية الأداء، وتصميم الواجهات الزجاجية المتناسقة Glassmorphism.',
      githubBtn: 'الملف الشخصي على GitHub',
      linktreeBtn: 'حسابات Linktree',
      skillsTitle: 'القدرات والمهارات التقنية',
      gamesTitle: 'ألعاب ملهمة ومفضلة',
      gamesList: 'Ark: Survival Evolved • Kingdom Come: Deliverance II • Elden Ring',
    },
    contact: {
      sectionPill: 'قنوات التواصل المباشر',
      sectionTitle: 'دعنا نتواصل معاً',
      subtitle: 'يسعدني التواصل معك مباشرة عبر البريد الإلكتروني أو حساب GitHub أو من خلال نموذج المراسلة التالي.',
      emailLabel: 'البريد الإلكتروني (انقر للنسخ)',
      copied: 'تم نسخ البريد بنجاح!',
      githubLabel: 'صفحة المطور على GitHub',
      locationLabel: 'المقر / الجامعة',
      locationVal: 'جامعة الإمام عبد الرحمن بن فيصل، الدمام، المنطقة الشرقية، المملكة العربية السعودية',
      formName: 'الاسم الكامل',
      formEmail: 'البريد الإلكتروني',
      formMessage: 'تفاصيل المشروع أو الرسالة',
      namePlaceholder: 'مثال: عبد الله السالم',
      emailPlaceholder: 'مثال: contact@example.com',
      messagePlaceholder: 'اكتب استفسارك أو تفاصيل المشروع...',
      sendBtn: 'إرسال الرسالة',
      sentSuccess: 'تم إرسال رسالتك بنجاح! شكراً لتواصلك.',
    },
    terminal: {
      badge: 'حماية الأمان نشطة',
      title: 'bash + AI — mohamed@iau-workstation:~',
      welcomeMsg: 'الطرفية الهندسية والمساعد الذكي لمحمد أحمد [v2.4.0]',
      typeHelp: 'اكتب help أو مساعدة لعرض الأوامر، أو انقر على الاختصارات السريعة بالأسفل.',
      inputPlaceholder: 'اكتب أمراً أو سؤالاً (مثال: help, مشاريع, مهارات)...',
      chips: {
        projects: 'المشاريع',
        skills: 'المهارات',
        apps: 'تطبيقات Google Play',
        bio: 'من أنا؟',
        aiAcademic: 'الخبرة والمسيرة الأكاديمية',
        car3d: 'مميزات سيارة 3D WebGL',
        contact: 'قنوات التواصل',
        theme: 'تبديل المظهر',
        clear: 'مسح الطرفية',
      },
      secSqLi: '[تدقيق الأمان] تم اكتشاف محاولة حقن SQL وإبطالها فوراً. بيئة العميل ثابتة ومحصنة وخالية من قواعد SQL.',
      secPromptInj: '[تدقيق الأمان] تم اعتراض محاولة اختراق الأوامر (Prompt Injection) وحجبها. ضوابط الأمان مفروضة ونشطة.',
      aiTitle: 'المساعد الذكي (Ma16q AI):',
    },
    footer: {
      copy: `© ${new Date().getFullYear()} محمد أحمد (Ma16q) • جامعة الإمام عبد الرحمن بن فيصل (IAU). جميع الحقوق محفوظة.`,
      top: 'العودة للأعلى',
    },
  },
};
