import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
const SQLI_REGEX = /('|"|;|--|\/\*|\*\/)\s*(or|and|union|select|insert|drop|delete|update|truncate|xp_|exec|cast|schema)\b/i;
const SQLI_KEYWORDS = /\b(or\s+1\s*=\s*1|union\s+select|drop\s+table|delete\s+from|insert\s+into)\b/i;
const PROMPT_INJ_REGEX = /\b(ignore\s+(all\s+)?(previous|prior)\s+instructions|system\s+prompt|you\s+are\s+now\s+dan|developer\s+mode|jailbreak|bypass\s+safety|forget\s+instructions)\b/i;
const SCRIPT_INJ_REGEX = /(<script|javascript:|eval\(|document\.cookie)/i;

export const DevTerminal: React.FC<DevTerminalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const initialBanner: CommandLog = {
    command: 'welcome',
    output: (
      <div style={{ lineHeight: 1.7 }}>
        <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', fontSize: '0.98rem' }}>
          {isAr
            ? '🚀 الطرفية الهندسية والمساعد الذكي لمحمد القفاص [v2.4.0]'
            : '🚀 Mohamed Al-Qaffas (Ma16q) Developer Terminal & AI [v2.4.0]'}
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
          {isAr ? (
            <>
              <span>اكتب</span>
              <span className="terminal-highlight-chip">help</span>
              <span>أو</span>
              <span className="terminal-highlight-chip">مساعدة</span>
              <span>لعرض الأوامر، أو انقر على الاختصارات السريعة بالأسفل!</span>
            </>
          ) : (
            <>
              <span>Type</span>
              <span className="terminal-highlight-chip">help</span>
              <span>or</span>
              <span className="terminal-highlight-chip">مساعدة</span>
              <span>to view available system commands, or click the quick action chips below!</span>
            </>
          )}
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
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    setHistory((prev) => {
      if (prev.length === 1 && prev[0].command === 'welcome') {
        return [initialBanner];
      }
      return prev;
    });
  }, [language]);

  const quickChips = [
    { label: t.terminal.chips.projects, cmd: 'projects', icon: <Code2 size={13} /> },
    { label: t.terminal.chips.skills, cmd: 'skills', icon: <Terminal size={13} /> },
    { label: t.terminal.chips.apps, cmd: 'play', icon: <Smartphone size={13} /> },
    { label: t.terminal.chips.bio, cmd: 'bio', icon: <User size={13} /> },
    { label: isAr ? 'التدريب المهني والخبرة؟' : 'Training & Work Experience', cmd: isAr ? 'ما هو تدريبك وخبرتك المهنية؟' : 'What is your software training & experience?', icon: <HelpCircle size={13} /> },
    { label: t.terminal.chips.car3d, cmd: 'car', icon: <Car size={13} /> },
    { label: t.terminal.chips.contact, cmd: 'contact', icon: <Send size={13} /> },
    { label: t.terminal.chips.theme, cmd: 'theme toggle', icon: <RefreshCw size={13} /> },
    { label: t.terminal.chips.clear, cmd: 'clear', icon: <RefreshCw size={13} /> },
  ];

  const processInput = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // --- SECURITY FIREWALL LAYER ---
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
    if (lower === 'clear' || lower === 'مسح' || lower === 'تنظيف' || lower === 'cls') {
      setHistory([initialBanner]);
      setInputVal('');
      return;
    }

    if (lower === 'help' || lower === 'مساعدة' || lower === 'أوامر' || lower === 'اوامر') {
      output = (
        <div style={{ lineHeight: 1.7 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'قائمة الأوامر الهندسية المتاحة:' : 'Available Engineering Commands:'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.4rem', marginTop: '0.4rem' }}>
            <p>• <span style={{ color: '#38bdf8' }}>projects / مشاريع</span> : {isAr ? 'عرض كافة المشاريع الهندسية' : 'List all engineering projects'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>skills / مهارات</span> : {isAr ? 'عرض المهارات والتقنيات' : 'Display technical engineering stack'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>play / تطبيقات</span> : {isAr ? 'تطبيقات Google Play الرسمية' : 'Google Play published applications'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>bio / من انا</span> : {isAr ? 'نبذة عن محمد القفاص والتدريب' : 'Developer bio, training & IAU'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>training / تدريب</span> : {isAr ? 'تفاصيل التدريب الميداني المهني' : 'Software engineering COOP training'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>contact / تواصل</span> : {isAr ? 'قنوات التواصل وروابط LinkedIn' : 'LinkedIn & official contact'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>car / سيارة</span> : {isAr ? 'محاكاة سيارة 3D WebGL' : '3D WebGL car telemetry'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>theme light / dark</span> : {isAr ? 'تبديل المظهر' : 'Toggle theme'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>clear / مسح</span> : {isAr ? 'إعادة ضبط الشاشة' : 'Reset terminal log'}</p>
            <p>• <span style={{ color: '#38bdf8' }}>exit / خروج</span> : {isAr ? 'إغلاق الطرفية' : 'Close terminal window'}</p>
          </div>
        </div>
      );
    }
    else if (lower === 'projects' || lower === 'مشاريع' || lower === 'المشاريع') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'دليل المشاريع البرمجية المعتمدة:' : 'Projects Directory:'}
          </p>
          {projectsData.map((p) => {
            const pTitle = isAr && p.titleAr ? p.titleAr : p.title;
            const pSumm = isAr && p.summaryAr ? p.summaryAr : p.summary;
            return (
              <div key={p.id} style={{ margin: '0.4rem 0', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(56, 189, 248, 0.4)' }}>
                <p style={{ color: '#f8fafc', fontWeight: 600 }}>• {pTitle} <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>[{p.category}]</span></p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{pSumm.slice(0, 95)}...</p>
              </div>
            );
          })}
        </div>
      );
    }
    else if (lower === 'skills' || lower === 'مهارات' || lower === 'المهارات') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'المهارات الهندسية وحزم التطوير:' : 'Technical Engineering Stack:'}
          </p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'اللغات:' : 'Languages:'}</span> Python, Java SDK, TypeScript, JavaScript (ES6+), HTML5/CSS3</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'تطبيقات الجوال:' : 'Mobile Apps:'}</span> Android Studio (Native Java), Flutter & Dart</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'الويب وثلاثي الأبعاد:' : '3D & WebGL:'}</span> React 19, Three.js, WebGL Shaders, Blender 3D, GLTF/DRACO</p>
          <p>• <span style={{ color: '#38bdf8' }}>{isAr ? 'الأنظمة والسحابة:' : 'Cloud & DevOps:'}</span> Git & GitHub, Google Cloud Platform (GCP), VS Code, Vercel</p>
        </div>
      );
    }
    else if (lower === 'play' || lower === 'تطبيقات' || lower === 'تطبيقاتي' || lower === 'قوقل بلاي' || lower === 'apps') {
      output = (
        <div>
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>
            {isAr ? 'التطبيقات المنشورة على متجر Google Play:' : 'Published Google Play Applications:'}
          </p>
          <p style={{ marginTop: '0.3rem' }}>
            1. <strong style={{ color: '#f8fafc' }}>{isAr ? 'مستحبات السنن' : 'Mustahabbat Al-Sunan'}</strong>: {isAr ? 'تطبيق شامل للأذكار والسنن اليومية بأداء Native خفيف وخيارات قراءة مخصصة.' : 'Islamic Sunnah habits & manners tracker with lightweight native performance.'}
          </p>
          <p style={{ marginTop: '0.3rem' }}>
            2. <strong style={{ color: '#f8fafc' }}>{isAr ? 'مسبحتي (Digital Tasbih)' : 'Musbihati (Digital Tasbih)'}</strong>: {isAr ? 'محاكاة واقعية لخاتم التسبيح الذكي مع اهتزاز لمسي وحفظ تلقائي.' : 'Smart digital tasbih simulated as a portable tally ring with haptic feedback.'}
          </p>
        </div>
      );
    }
    else if (lower === 'training' || lower === 'تدريب' || lower === 'تدريبي' || lower === 'coop') {
      output = (
        <div style={{ lineHeight: 1.6 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'التدريب الميداني المهني (Software Engineering Training):' : 'Software Engineering Professional Training:'}
          </p>
          <p>{isAr ? '• أنهى محمد القفاص برنامجه التدريبي الميداني في هندسة البرمجيات بنجاح، وطبق خلاله أفضل الممارسات في بناء الأنظمة البرمجية، وتطوير تطبيقات الجوال، والواجهات التفاعلية الحديثة.' : '• Mohamed Al-Qaffas has successfully completed his Software Engineering field internship/training, mastering mobile application pipelines, reactive web architectures, and full-stack software lifecycles.'}</p>
          <p>{isAr ? '• عضو ومشارك نشط في مجتمع مطوري جوجل الجامعي (GDG on Campus IAU).' : '• Active member in Google Developer Groups (GDG on Campus at IAU).'}</p>
        </div>
      );
    }
    else if (lower === 'bio' || lower === 'من انا' || lower === 'من_انا' || lower === 'عني' || lower === 'about') {
      output = (
        <div style={{ lineHeight: 1.6 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
            {isAr ? 'نبذة عن المطور محمد القفاص (Ma16q):' : 'About Mohamed Al-Qaffas (Ma16q):'}
          </p>
          <p>{isAr ? '🎓 طالب علوم حاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU) - كلية علوم الحاسب وتقنية المعلومات.' : '🎓 Computer Science student at Imam Abdulrahman Bin Faisal University (IAU) - CCSIT, Saudi Arabia.'}</p>
          <p>{isAr ? '💼 أتم متطلبات التدريب الميداني في هندسة البرمجيات بنجاح.' : '💼 Successfully completed software engineering field training.'}</p>
          <p>{isAr ? '🏆 مشارك في هاكاثون الصناعة بمسار التقنيات المتقدمة (ISE Club).' : '🏆 Industrial Hackathon participant (Advanced Technology Track).'}</p>
          <p>{isAr ? '🌐 رابط LinkedIn: https://www.linkedin.com/in/ma16q/' : '🌐 LinkedIn Profile: https://www.linkedin.com/in/ma16q/'}</p>
        </div>
      );
    }
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
    else if (lower === 'contact' || lower === 'تواصل' || lower === 'اتصال') {
      output = (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>
            {isAr ? 'قنوات التواصل الرسمية:' : 'Official Contact Channels:'}
          </p>
          <p>• LinkedIn: <a href="https://www.linkedin.com/in/ma16q/" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>linkedin.com/in/ma16q</a></p>
          <p>• GitHub: <a href="https://github.com/Ma16q" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>github.com/Ma16q</a></p>
          <p>• Google Play: <a href="https://play.google.com/store/apps/developer?id=Ma16q" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Ma16q Developer Profile</a></p>
          <p>• Email: mohammed.alqaffas1@gmail.com</p>
        </div>
      );
    }
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
    else if (lower === 'exit' || lower === 'خروج' || lower === 'اغلاق' || lower === 'إغلاق') {
      onClose();
      return;
    }
    // AI Assistant Natural Language Responder
    else {
      let aiResponse: string;

      if (lower.includes('تدريب') || lower.includes('training') || lower.includes('intern') || lower.includes('coop')) {
        aiResponse = isAr
          ? 'أنهى محمد القفاص (محمد أحمد) بنجاح برنامجه التدريبي الميداني في هندسة البرمجيات وتطوير الأنظمة، حيث اكتسب خبرة عملية مكثفة في معمارية تطبيقات الجوال والويب وإدارة الجودة البرمجية بجانب عضويته في مجتمع مطوري جوجل (GDG on Campus IAU).'
          : 'Mohamed Al-Qaffas has successfully completed his professional field training in Software Engineering, building real-world expertise in mobile app ecosystems, reactive web platforms, and code architecture alongside his active membership in Google Developer Groups (GDG on Campus).';
      } else if (lower.includes('خبر') || lower.includes('تدرس') || lower.includes('جامع') || lower.includes('دراسة') || lower.includes('study') || lower.includes('experience')) {
        aiResponse = isAr
          ? 'محمد القفاص يدرس علوم الحاسب في جامعة الإمام عبد الرحمن بن فيصل (IAU) بالمنطقة الشرقية، وقد أتم تدريبه الميداني البرمجي. نشر تطبيقين على متجر Google Play، وشارك في هاكاثون الصناعة للتقنيات المتقدمة، ومتخصص في الـ Full-Stack و 3D WebGL.'
          : 'Mohamed Al-Qaffas studies Computer Science at Imam Abdulrahman Bin Faisal University (IAU) and has completed his software engineering training. He published two Google Play apps, participated in the Industrial Hackathon, and specializes in Full-Stack and 3D WebGL.';
      } else if (lower.includes('طلب') || lower.includes('مشروع') || lower.includes('شغل') || lower.includes('عمل') || lower.includes('خدم') || lower.includes('hire') || lower.includes('project')) {
        aiResponse = isAr
          ? 'محمد متاح لمشاريع تطوير البرمجيات وحلول الويب وتطبيقات الجوال. يمكنك زيارة ملفه على LinkedIn (https://www.linkedin.com/in/ma16q/) أو مراسلته عبر نموذج التواصل السريع.'
          : 'Mohamed is open for software engineering collaboration on mobile apps, reactive web platforms, and 3D systems. Check his LinkedIn (https://www.linkedin.com/in/ma16q/) or send a message via the contact form.';
      } else if (lower.includes('تطبيق') || lower.includes('اندرويد') || lower.includes('android') || lower.includes('play') || lower.includes('app')) {
        aiResponse = isAr
          ? 'نشر محمد تطبيقين معتمدين على متجر Google Play: "مستحبات السنن" لمتابعة الأذكار والسنن، و"مسبحتي" لخاتم التسبيح الرقمي مع اهتزاز فيزيائي، وحاز كلاهما على تقييمات ممتازة.'
          : 'Mohamed published two official apps on Google Play: "Mustahabbat Al-Sunan" (habits tracker) and "Musbihati" (digital tasbih ring with haptics), both highly rated.';
      } else if (lower.includes('3d') || lower.includes('ثلاثي') || lower.includes('سيار') || lower.includes('three') || lower.includes('car')) {
        aiResponse = isAr
          ? 'تجربة سيارة 3D مطورة باستخدام مكتبة Three.js مع WebGL ومحسنة بضغط DRACO. تتيح تدوير الكاميرا 360 درجة، تغيير ألوان الطلاء، ومحاكاة بيانات التيليماتري.'
          : 'The 3D car experience is built with Three.js and WebGL, optimized with DRACO geometry compression, featuring 360° camera orbit, paint shader customization, and real-time telemetry.';
      } else if (lower.includes('نشر') || lower.includes('فيرسل') || lower.includes('vercel') || lower.includes('deploy')) {
        aiResponse = isAr
          ? 'المشروع مهيأ بالكامل للنشر الفوري على Vercel أو GitHub Pages بضغطة زر واحدة، حيث تم بناؤه بهيكلية سريعة وخفيفة بالكامل من جانب العميل بدون أي تعقيدات باك إند زائدة.'
          : 'The project is 100% optimized for instant zero-config deployment on Vercel or GitHub Pages, utilizing pure client-side React 19 architecture with zero backend bloat.';
      } else if (lower.includes('سلام') || lower.includes('مرحبا') || lower.includes('هلا') || lower.includes('hi') || lower.includes('hello')) {
        aiResponse = isAr
          ? 'أهلاً وسهلاً بك! أنا المساعد الذكي لمحمد القفاص (Ma16q). كيف يمكنني إفادتك اليوم؟ يمكنك سؤالي عن مشاريعه، تدريبه الميداني، أو خبراته البرمجية.'
          : `Hello and welcome! I am Mohamed Al-Qaffas's AI Assistant. How can I help you today? You can browse projects or ask about his software training and engineering stack.`;
      } else {
        aiResponse = isAr
          ? `بخصوص استفسارك "${trimmed}"، يمكنك استعراض المشاريع بكتابة "projects"، أو التدريب بكتابة "training"، أو زيارة LinkedIn عبر "contact".`
          : `Regarding "${trimmed}", you can explore projects by typing "projects", review training with "training", or check LinkedIn by typing "contact".`;
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="terminal-card glass-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
