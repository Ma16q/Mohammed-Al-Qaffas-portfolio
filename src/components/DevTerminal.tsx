import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, ShieldCheck, Send, CheckCircle, Code2, Smartphone, User, HelpCircle, RefreshCw, Car } from "lucide-react";
import { projectsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface DevTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: (mode?: 'dark' | 'light') => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

// Security Detection RegEx Patterns
const SQLI_REGEX = /('|"|;|--|\/\*|\*\/)\s*(or|and|union|select|insert|drop|delete|update|truncate|xp_|exec|cast|schema)/i;
const SQLI_KEYWORDS = /(or\s+1\s*=\s*1|union\s+select|drop\s+table|delete\s+from|insert\s+into)/i;
const PROMPT_INJ_REGEX = /(ignore\s+(all\s+)?(previous|prior)\s+instructions|system\s+prompt|you\s+are\s+now\s+dan|developer\s+mode|jailbreak|bypass\s+safety|forget\s+instructions)/i;
const SCRIPT_INJ_REGEX = /(<script|javascript:|eval\(|document\.cookie)/i;

export const DevTerminal: React.FC<DevTerminalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const initialBanner: CommandLog = {
    command: 'welcome',
    output: (
      <div style={{ lineHeight: 1.6 }}>
        <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
          {t.terminal.welcomeMsg}
        </p>
        <p style={{ color: 'var(--text-muted)' }}>
          {t.terminal.typeHelp}
        </p>
      </div>
    )
  };

  const [history, setHistory] = useState<CommandLog[]>([initialBanner]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Sync welcome banner on language switch if history only contains banner
  useEffect(() => {
    setHistory((prev) => {
      if (prev.length === 1 && prev[0].command === 'welcome') {
        return [initialBanner];
      }
      return prev;
    });
  }, [language]);

  if (!isOpen) return null;

  const quickChips = [
    { label: t.terminal.chips.projects, cmd: 'projects', icon: <Code2 size={13} /> },
    { label: t.terminal.chips.skills, cmd: 'skills', icon: <Terminal size={13} /> },
    { label: t.terminal.chips.apps, cmd: 'play', icon: <Smartphone size={13} /> },
    { label: t.terminal.chips.bio, cmd: 'bio', icon: <User size={13} /> },
    { label: t.terminal.chips.aiAcademic, cmd: isAr ? 'ما هي دراستك وخبرتك الأكاديمية؟' : 'What is your academic & dev experience?', icon: <HelpCircle size={13} /> },
    { label: t.terminal.chips.car3d, cmd: 'car', icon: <Car size={13} /> },
    { label: t.terminal.chips.contact, cmd: 'contact', icon: <Send size={13} /> },
    { label: t.terminal.chips.theme, cmd: 'theme toggle', icon: <RefreshCw size={13} /> },
    { label: t.terminal.chips.clear, cmd: 'clear', icon: <RefreshCw size={13} /> },
  ];

  const processInput = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // --- SECURITY FIREWALL LAYER ---
    // 1. SQL Injection Detection
    if (SQLI_REGEX.test(trimmed) || SQLI_KEYWORDS.test(trimmed)) {
      const output = (
        <div className="terminal-sec-alert">
          <p style={{ color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} />
            <span>{isAr ? '[تدقيق الأمان: حماية SQL]' : '[SECURITY AUDIT: SQL DEFENSE]'}</span>
          </p>
          <p style={{ color: '#fca5a5', marginTop: '0.2rem', fontSize: '0.86rem' }}>
            {t.terminal.secSqLi}
          </p>
        </div>
      );
      setHistory((prev) => [...prev, { command: trimmed, output }]);
      setInputVal('');
      return;
    }

    // 2. Prompt Injection & Script Injection Detection
    if (PROMPT_INJ_REGEX.test(trimmed) || SCRIPT_INJ_REGEX.test(trimmed)) {
      const output = (
        <div className="terminal-sec-alert">
          <p style={{ color: '#f59e0b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} />
            <span>{isAr ? '[تدقيق الأمان: حماية الأوامر]' : '[SECURITY AUDIT: INJECTION BLOCKED]'}</span>
          </p>
          <p style={{ color: '#fde68a', marginTop: '0.2rem', fontSize: '0.86rem' }}>
            {t.terminal.secPromptInj}
          </p>
        </div>
      );
      setHistory((prev) => [...prev, { command: trimmed, output }]);
      setInputVal('');
      return;
    }

    const lower = trimmed.toLowerCase();
    let output: React.ReactNode;

    // --- COMMAND HANDLERS ---
    // Clear command: restores initial welcome banner
    if (lower === 'clear' || lower === 'مسح' || lower === 'تنظيف' || lower === 'cls') {
      setHistory([initialBanner]);
      setInputVal('');
      return;
    }

    // Help
    if (lower === 'help' || lower === 'مساعدة' || lower === 'أوامر' || lower === 'اوامر') {
      output = (
        <div style={{ lineHeight: 1.7 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'قائمة الأوامر الهندسية المتاحة:' : 'Available Engineering Commands:'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.4rem', marginTop: '0.4rem' }}>
            <p>• <span style={{ color: '#38bdf8' }}>projects / مشاريع</span> : {isAr ? 'عرض كافة المشاريع' : 'List all projects'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>skills / مهارات</span> : {isAr ? 'عرض القدرات التقنية' : 'Display technical stack'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>play / تطبيقات</span> : {isAr ? 'تطبيقات متجر Google Play' : 'Google Play published apps'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>bio / من انا</span> : {isAr ? 'نبذة عن المطور والجامعة' : 'Developer background & IAU'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>contact / تواصل</span> : {isAr ? 'قنوات التواصل المباشر' : 'Official contact channels'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>car / سيارة</span> : {isAr ? 'تفاصيل محاكاة سيارة 3D' : '3D WebGL car telemetry'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>theme light / dark</span> : {isAr ? 'تبديل المظهر' : 'Toggle dark/light theme'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>clear / مسح</span> : {isAr ? 'إعادة ضبط الشاشة' : 'Reset terminal log'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>exit / خروج</span> : {isAr ? 'إغلاق الطرفية' : 'Close terminal window'}</p>
          </div>
        </div>
      );
    }
    // Projects
    else if (lower === 'projects' || lower === 'مشاريع' || lower === 'المشاريع') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'دليل المشاريع البرمجية:' : 'Projects Directory:'}
          </p>
          {projectsData.map((p) => {
            const pTitle = isAr && p.titleAr ? p.titleAr : p.title;
            const pSumm = isAr && p.summaryAr ? p.summaryAr : p.summary;
            return (
              <div key={p.id} style={{ margin: '0.4rem 0', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(56, 189, 248, 0.4)' }}>
                <p style={{ color: '#f8fafc', fontWeight: 600 }}>• {pTitle} <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>[{p.category}]</span></p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{pSumm.slice(0, 90)}...</p>
              </div>
            );
          })}
        </div>
      );
    }
    // Skills
    else if (lower === 'skills' || lower === 'مهارات' || lower === 'المهارات') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'المهارات الهندسية وحزم التطوير:' : 'Technical Engineering Stack:'}
          </p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'اللغات:' : 'Languages:'}</span> Python, Java SDK, TypeScript, JavaScript (ES6+), HTML5/CSS3</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'تطبيقات الجوال:' : 'Mobile Development:'}</span> Android Studio (Native Java), Flutter & Dart</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'الويب وثلاثي الأبعاد:' : '3D & WebGL:'}</span> React 19, Three.js, WebGL Shaders, Blender 3D, GLTF/DRACO</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'الأدوات والأنظمة:' : 'DevOps & Tools:'}</span> Git & GitHub, Google Cloud Platform (GCP), VS Code</p>
        </div>
      );
    }
    // Play
    else if (lower === 'play' || lower === 'تطبيقات' || lower === 'تطبيقاتي' || lower === 'قوقل بلاي' || lower === 'apps') {
      output = (
        <div>
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>
            {isAr ? 'التطبيقات المنشورة على متجر Google Play:' : 'Published Google Play Applications:'}
          </p>
          <p style={{ marginTop: '0.3rem' }}>
            1. <strong style={{ color: '#f8fafc' }}>{isAr ? 'مستحبات السنن' : 'Mustahabbat Al-Sunan'}</strong>: {isAr ? 'تطبيق شامل للأذكار والسنن اليومية بأداء فائق وخيارات قراءة مخصصة.' : 'Islamic Sunnah habits & manners tracker with lightweight native performance.'}
          </p>
          <p style={{ marginTop: '0.3rem' }}>
            2. <strong style={{ color: '#f8fafc' }}>{isAr ? 'مسبحتي (Digital Tasbih)' : 'Musbihati (Digital Tasbih)'}</strong>: {isAr ? 'محاكاة واقعية لخاتم التسبيح الذكي مع اهتزاز لمسي وحفظ تلقائي.' : 'Smart digital tasbih simulated as a portable tally ring with haptic feedback.'}
          </p>
        </div>
      );
    }
    // Bio
    else if (lower === 'bio' || lower === 'من انا' || lower === 'من_انا' || lower === 'عني' || lower === 'about') {
      output = (
        <div style={{ lineHeight: 1.6 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'نبذة عن المطور محمد أحمد (Ma16q):' : 'About Mohamed Ahmed (Ma16q):'}
          </p>
          <p>{isAr ? 'طالب علوم حاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU) بالمنطقة الشرقية.' : 'Computer Science student at Imam Abdulrahman Bin Faisal University (IAU), Eastern Province, Saudi Arabia.'}</p>
          <p>{isAr ? 'مشارك في هاكاثون الصناعة (مسار التقنيات المتقدمة مع نادي الهندسة الصناعية).' : 'Participant in Industrial Hackathon (Advanced Technology Track with the ISE Club).'}</p>
          <p>{isAr ? 'متخصص في تطوير التطبيقات الأصيلة، وبرمجيات الويب التفاعلية 3D WebGL، وتصميم الواجهات الزجاجية المتناسقة.' : 'Specialized in native mobile development, interactive 3D WebGL experiences, and modern Glassmorphism interfaces.'}</p>
        </div>
      );
    }
    // Car 3D
    else if (lower === 'car' || lower === 'سيارة' || lower === '3d') {
      output = (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>
            {isAr ? 'محاكاة سيارة 3D التفاعلية (Three.js WebGL):' : 'Interactive 3D WebGL Vehicle Experience:'}
          </p>
          <p>• {isAr ? 'مبنية بتقنيات Three.js مع إضاءة فيزيائية واقعية PBR ومحرك تدوير مداري 360 درجة.' : 'Built with Three.js featuring real-time PBR shaders, dynamic orbital camera, and engine audio synthesis.'}</p>
          <p>• {isAr ? 'تحكم كامل بألوان الطلاء، المصابيح، وفحص التيليماتري الهيكلي.' : 'Full controls for paint customization, headlights, and structural wireframe telemetry.'}</p>
        </div>
      );
    }
    // Contact
    else if (lower === 'contact' || lower === 'تواصل' || lower === 'اتصال') {
      output = (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>
            {isAr ? 'قنوات التواصل الرسمية:' : 'Official Contact Channels:'}
          </p>
          <p>• GitHub: <a href="https://github.com/Ma16q" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>github.com/Ma16q</a></p>
          <p>• Google Play: <a href="https://play.google.com/store/apps/developer?id=Ma16q" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Ma16q Developer Profile</a></p>
          <p>• Email: abcb1240009m@gmail.com</p>
        </div>
      );
    }
    // Theme controls
    else if (lower === 'theme dark' || lower === 'dark' || lower === 'مظلم') {
      if (onToggleTheme) onToggleTheme('dark');
      output = <p style={{ color: '#38bdf8' }}>{isAr ? 'تم تفعيل الوضع الليلي' : 'Dark Mode Activated'}</p>;
    }
    else if (lower === 'theme light' || lower === 'light' || lower === 'مضيء' || lower === 'نهاري') {
      if (onToggleTheme) onToggleTheme('light');
      output = <p style={{ color: '#f59e0b' }}>{isAr ? 'تم تفعيل الوضع النهاري' : 'Light Mode Activated'}</p>;
    }
    else if (lower === 'theme toggle' || lower === 'ثيم') {
      if (onToggleTheme) onToggleTheme();
      output = <p style={{ color: '#38bdf8' }}>{isAr ? 'تم تبديل المظهر بنجاح' : 'Theme toggled successfully'}</p>;
    }
    // Exit
    else if (lower === 'exit' || lower === 'خروج' || lower === 'اغلاق' || lower === 'إغلاق') {
      onClose();
      return;
    }
    // AI Assistant Natural Language Responder
    else {
      let aiResponse: string;

      if (lower.includes('خبر') || lower.includes('تدرس') || lower.includes('جامع') || lower.includes('دراسة') || lower.includes('study') || lower.includes('experience')) {
        aiResponse = isAr
          ? 'محمد أحمد يدرس علوم الحاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU). يمتلك خبرة عملية في تطوير تطبيقات أندرويد نيتف (جافا)، وتطبيقات الويب الحديثة (React 19 + TypeScript)، وبرمجيات ثلاثية الأبعاد (Three.js)، وشارك في هاكاثون الصناعة لمسار التقنيات المتقدمة.'
          : 'Mohamed Ahmed is a Computer Science student at Imam Abdulrahman Bin Faisal University (IAU). He specializes in native Android engineering (Java), modern React 19 web platforms, and Three.js 3D WebGL experiences, and participated in the Industrial Hackathon advanced tech track.';
      } else if (lower.includes('طلب') || lower.includes('مشروع') || lower.includes('شغل') || lower.includes('عمل') || lower.includes('خدم') || lower.includes('hire') || lower.includes('project')) {
        aiResponse = isAr
          ? 'محمد متاح للتعاون في مشاريع تطوير تطبيقات الجوال (Android/Flutter) وحلول الويب التفاعلية ثلاثية الأبعاد. يمكنك التواصل عبر البريد الإلكتروني أو نموذج المراسلة المباشر في قسم التواصل أسفل الموقع.'
          : 'Mohamed is open for software collaboration on mobile apps, full-stack web platforms, and interactive 3D WebGL systems. Reach out via email or the direct contact form below.';
      } else if (lower.includes('تطبيق') || lower.includes('اندرويد') || lower.includes('android') || lower.includes('play') || lower.includes('app')) {
        aiResponse = isAr
          ? 'نشر محمد تطبيقين معتمدين على متجر Google Play: "مستحبات السنن" لمتابعة الأذكار، و"مسبحتي" لخاتم التسبيح الرقمي مع اهتزاز فيزيائي، وكلاهما بتقييمات ممتازة.'
          : 'Mohamed has published two official apps on Google Play: "Mustahabbat Al-Sunan" (Islamic habits tracker) and "Musbihati" (digital tasbih ring simulator with haptics), both highly rated.';
      } else if (lower.includes('3d') || lower.includes('ثلاثي') || lower.includes('سيار') || lower.includes('three') || lower.includes('car')) {
        aiResponse = isAr
          ? 'تجربة سيارة 3D مطورة باستخدام مكتبة Three.js مع WebGL ومحسنة بضغط DRACO. تتيح تدوير الكاميرا 360 درجة، تغيير ألوان الطلاء، ومحاكاة بيانات التيليماتري.'
          : 'The 3D car experience is built with Three.js and WebGL, optimized with DRACO geometry compression, featuring 360° camera orbit, paint shader customization, and real-time telemetry.';
      } else if (lower.includes('سلام') || lower.includes('مرحبا') || lower.includes('هلا') || lower.includes('hi') || lower.includes('hello')) {
        aiResponse = isAr
          ? 'أهلاً بك! أنا المساعد الذكي لمحمد أحمد. كيف يمكنني إفادتك اليوم؟ يمكنك استعراض المشاريع أو الاستفسار عن أي مهارة هندسية.'
          : `Hello and welcome! I am Mohamed Ahmed's AI Assistant. How can I help you today? You can browse projects or ask about his technical engineering stack.`;
      } else {
        aiResponse = isAr
          ? `بخصوص استفسارك "${trimmed}"، يمكنك استعراض المشاريع بكتابة "projects"، أو المهارات بكتابة "skills"، أو التواصل مباشرة عبر نموذج المراسلة.`
          : `Regarding "${trimmed}", you can explore projects by typing "projects", inspect technical skills with "skills", or reach out directly through the contact section.`;
      }

      output = (
        <div className="terminal-ai-response">
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
            <CheckCircle size={14} />
            <span>{t.terminal.aiTitle}</span>
          </p>
          <p style={{ color: '#f1f5f9' }}>{aiResponse}</p>
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(inputVal);
  };

  const handleChipClick = (cmd: string) => {
    processInput(cmd);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog">
      <div className="terminal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Titlebar */}
        <div className="terminal-titlebar">
          <div className="terminal-controls">
            <span className="term-dot dot-red" onClick={onClose} title="Close"></span>
            <span className="term-dot dot-yellow" title="Minimize"></span>
            <span className="term-dot dot-green" title="Maximize"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>{t.terminal.title}</span>
            <span className="terminal-ai-badge">
              <ShieldCheck size={12} /> {t.terminal.badge}
            </span>
          </div>
          <button type="button" className="term-close-icon" onClick={onClose} aria-label="Close terminal">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body with Native Custom Scrollbar */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <span>➜</span>
                <span style={{ color: '#818cf8' }}>~</span>
                <strong style={{ color: '#f8fafc' }}>{item.command}</strong>
              </div>
              <div style={{ marginTop: '0.25rem', paddingLeft: isAr ? '0' : '1rem', paddingRight: isAr ? '1rem' : '0', color: '#cbd5e1' }}>
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt line */}
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>➜</span>
            <span style={{ color: '#818cf8' }}>~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="terminal-input"
              placeholder={t.terminal.inputPlaceholder}
              autoFocus
            />
            <button type="submit" className="terminal-send-btn" title="Send Command">
              <Send size={14} />
            </button>
          </form>
          <div ref={bottomRef}></div>
        </div>

        {/* Quick Shortcuts / Action Chips */}
        <div className="terminal-chips-bar">
          <div className="terminal-chips-scroll">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                type="button"
                className="terminal-chip"
                onClick={() => handleChipClick(chip.cmd)}
              >
                {chip.icon}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
