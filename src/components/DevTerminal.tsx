import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Sparkles, Send } from "lucide-react";
import { projectsData } from '../data/portfolioData';

interface DevTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTheme?: (mode?: 'dark' | 'light') => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

const INITIAL_BANNER: CommandLog = {
  command: 'welcome',
  output: (
    <div style={{ lineHeight: 1.6 }}>
      <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>
        🚀 Mohamed Ahmed (Ma16q) Developer Terminal & AI [v2.4.0]
      </p>
      <p style={{ color: 'var(--text-muted)' }}>
        اكتب <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>help</span> أو <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>مساعدة</span> لعرض الأوامر، أو انقر على الأسئلة السريعة بالأسفل!
      </p>
    </div>
  )
};

const QUICK_CHIPS = [
  { label: '💼 المشاريع (projects)', cmd: 'projects' },
  { label: '🛠️ المهارات (skills)', cmd: 'skills' },
  { label: '📱 تطبيقات Google Play', cmd: 'play' },
  { label: '👤 من أنا؟ (bio)', cmd: 'bio' },
  { label: '🤖 خبرتي الأكاديمية والعملية؟', cmd: 'ما هي خبرتك وماذا تدرس؟' },
  { label: '🚗 مميزات سيارة 3D', cmd: 'car' },
  { label: '📞 تواصل معي (contact)', cmd: 'contact' },
  { label: '🌓 تبديل الثيم', cmd: 'theme toggle' },
  { label: '🧹 مسح (clear)', cmd: 'clear' },
];

export const DevTerminal: React.FC<DevTerminalProps> = ({ isOpen, onClose, onToggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([INITIAL_BANNER]);

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

  if (!isOpen) return null;

  const processInput = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    let output: React.ReactNode;

    // 1. CLEAR command (Keeps the welcome header intact as requested)
    if (lower === 'clear' || lower === 'مسح' || lower === 'تنظيف' || lower === 'cls') {
      setHistory([INITIAL_BANNER]);
      setInputVal('');
      return;
    }

    // 2. HELP / مساعدة
    if (lower === 'help' || lower === 'مساعدة' || lower === 'أوامر' || lower === 'اوامر') {
      output = (
        <div style={{ lineHeight: 1.7 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>📜 الأوامر المتاحة (Available Commands):</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.4rem', marginTop: '0.4rem' }}>
            <p>• <span style={{ color: '#38bdf8' }}>projects / مشاريع</span> : استعراض كافة المشاريع</p>
            <p>• <span style={{ color: '#38bdf8' }}>skills / مهارات</span> : التقنيات ولغات البرمجة</p>
            <p>• <span style={{ color: '#38bdf8' }}>play / تطبيقات</span> : تطبيقات متجر Google Play</p>
            <p>• <span style={{ color: '#38bdf8' }}>bio / من انا</span> : نبذة عن محمد وجامعة IAU</p>
            <p>• <span style={{ color: '#38bdf8' }}>contact / تواصل</span> : طرق التواصل والروابط</p>
            <p>• <span style={{ color: '#38bdf8' }}>car / سيارة</span> : تفاصيل تجربة سيارة 3D WebGL</p>
            <p>• <span style={{ color: '#38bdf8' }}>theme light / dark</span> : تبديل المظهر النهاري/الليلي</p>
            <p>• <span style={{ color: '#38bdf8' }}>clear / مسح</span> : إعادة ضبط الطرفية</p>
            <p>• <span style={{ color: '#38bdf8' }}>exit / خروج</span> : إغلاق الطرفية</p>
          </div>
          <p style={{ color: '#f59e0b', marginTop: '0.5rem', fontSize: '0.85rem' }}>
            💡 ملاحظة: يمكنك كتابة أي سؤال بالعربي وسيجيبك المساعد الذكي المدمج مباشرة!
          </p>
        </div>
      );
    }
    // 3. PROJECTS / مشاريع
    else if (lower === 'projects' || lower === 'مشاريع' || lower === 'المشاريع') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>⚡ دليل المشاريع (Projects Directory):</p>
          {projectsData.map((p) => (
            <div key={p.id} style={{ margin: '0.4rem 0', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(56, 189, 248, 0.4)' }}>
              <p style={{ color: '#f8fafc', fontWeight: 600 }}>• {p.title} <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>[{p.category}]</span></p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.summary.slice(0, 85)}...</p>
            </div>
          ))}
        </div>
      );
    }
    // 4. SKILLS / مهارات
    else if (lower === 'skills' || lower === 'مهارات' || lower === 'المهارات') {
      output = (
        <div>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>🛠️ المهارات التقنية وهندسة البرمجيات:</p>
          <p>• <span style={{ color: '#38bdf8' }}>لغات البرمجة:</span> Python, Java, TypeScript, JavaScript, HTML5/CSS3</p>
          <p>• <span style={{ color: '#38bdf8' }}>تطوير الجوال:</span> Android Studio (Native Java), Flutter (Dart)</p>
          <p>• <span style={{ color: '#38bdf8' }}>ثلاثي الأبعاد والويب:</span> Three.js, WebGL, React 19, Blender 3D, GLTF/DRACO</p>
          <p>• <span style={{ color: '#38bdf8' }}>الأدوات السحابية:</span> Git & GitHub, Google Cloud Platform (GCP), VS Code</p>
        </div>
      );
    }
    // 5. PLAY / تطبيقات Google Play
    else if (lower === 'play' || lower === 'تطبيقات' || lower === 'تطبيقاتي' || lower === 'قوقل بلاي' || lower === 'apps') {
      output = (
        <div>
          <p style={{ color: '#10b981', fontWeight: 'bold' }}>📱 تطبيقات منشورة رسمياً على Google Play:</p>
          <p style={{ marginTop: '0.3rem' }}>
            1. <strong style={{ color: '#f8fafc' }}>مستحبات السنن</strong>: تطبيق أندرويد متكامل يضم أدعية وزيارات وإحصائيات عبادية مع واجهة أنيقة.
          </p>
          <p style={{ marginTop: '0.3rem' }}>
            2. <strong style={{ color: '#f8fafc' }}>مسبحتي (Digital Tasbih)</strong>: محاكي خاتم تسبيح واقعي مع اهتزاز لمسي وحفظ تلقائي للأذكار.
          </p>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.85rem' }}>
            🔗 متوفرة مجاناً للتحميل برابط مباشر في قسم المشاريع.
          </p>
        </div>
      );
    }
    // 6. BIO / من أنا
    else if (lower === 'bio' || lower === 'من انا' || lower === 'من_انا' || lower === 'عني' || lower === 'about') {
      output = (
        <div style={{ lineHeight: 1.6 }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>👤 نبذة عن المطور محمد أحمد (Ma16q):</p>
          <p>🎓 طالب في <strong>جامعة الإمام عبد الرحمن بن فيصل (IAU)</strong> - المنطقة الشرقية، المملكة العربية السعودية.</p>
          <p>🏆 مشارك في <strong>هاكاثون الصناعة (Industrial Hackathon)</strong> بمسار التقنيات المتقدمة مع نادي الهندسة الصناعية (ISE).</p>
          <p>💡 متخصص في بناء التطبيقات المتقدمة، وبرمجيات الويب التفاعلية ثلاثية الأبعاد (3D WebGL)، وتصميم الواجهات الحديثة Glassmorphism.</p>
        </div>
      );
    }
    // 7. CAR / سيارة 3D
    else if (lower === 'car' || lower === 'سيارة' || lower === '3d') {
      output = (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>🚗 استعراض سيارة 3D التفاعلي (WebGL Showcase):</p>
          <p>• تم بناؤها باستخدام مكتبة <strong>Three.js</strong> وتقنيات الإضاءة الفيزيائية PBR.</p>
          <p>• تتيح تغيير لون الطلاء، تشغيل المصابيح الأمامية/الخلفية، دوران الكاميرا السينمائي، وأصوات تشغيل المحرك الحقيقي.</p>
          <p>• تفضل بتجربتها في قسم "3D Car Experience" داخل الموقع!</p>
        </div>
      );
    }
    // 8. CONTACT / تواصل
    else if (lower === 'contact' || lower === 'تواصل' || lower === 'اتصال') {
      output = (
        <div>
          <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>📬 قنوات التواصل الرسمية:</p>
          <p>• GitHub: <a href="https://github.com/Ma16q" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>github.com/Ma16q</a></p>
          <p>• Google Play: <a href="https://play.google.com/store/apps/developer?id=Ma16q" target="_blank" rel="noreferrer" style={{ color: '#10b981', textDecoration: 'underline' }}>Ma16q Developer Page</a></p>
          <p>• LinkedIn: متوفر في شريط التواصل السريع أسفل الموقع.</p>
        </div>
      );
    }
    // 9. THEME CONTROLS
    else if (lower === 'theme dark' || lower === 'dark' || lower === 'مظلم') {
      if (onToggleTheme) onToggleTheme('dark');
      output = <p style={{ color: '#38bdf8' }}>تم تفعيل الوضع الليلي 🌙 (Dark Mode)</p>;
    }
    else if (lower === 'theme light' || lower === 'light' || lower === 'مضيء' || lower === 'نهاري') {
      if (onToggleTheme) onToggleTheme('light');
      output = <p style={{ color: '#f59e0b' }}>تم تفعيل الوضع النهاري ☀️ (Light Mode)</p>;
    }
    else if (lower === 'theme toggle' || lower === 'ثيم') {
      if (onToggleTheme) onToggleTheme();
      output = <p style={{ color: '#38bdf8' }}>تم تبديل مظهر الموقع 🌓</p>;
    }
    // 10. EXIT
    else if (lower === 'exit' || lower === 'خروج' || lower === 'اغلاق' || lower === 'إغلاق') {
      onClose();
      return;
    }
    // 11. AI ASSISTANT SMART RESPONDER (Matches questions or natural queries in Arabic/English)
    else {
      let aiResponse: string;

      if (lower.includes('خبر') || lower.includes('تدرس') || lower.includes('جامع') || lower.includes('دراسة')) {
        aiResponse = 'أنا محمد أحمد، طالب في جامعة الإمام عبد الرحمن بن فيصل (IAU). أجمع بين الدراسة الأكاديمية والشغف العملي، حيث أطور تطبيقات Android نيتف، ومواقع ويب حديثة بتقنيات React وThree.js، وشاركت في هاكاثون الصناعة لمسار التقنيات المتقدمة.';
      } else if (lower.includes('طلب') || lower.includes('مشروع') || lower.includes('شغل') || lower.includes('عمل') || lower.includes('خدم')) {
        aiResponse = 'يسعدني العمل على مشاريع تطوير تطبيقات الجوال (Android/Flutter)، وتطوير مواقع الويب الحديثة التفاعلية والمجسمات ثلاثية الأبعاد. يمكنك التواصل معي عبر حساب GitHub أو البريد الإلكتروني لمناقشة التفاصيل!';
      } else if (lower.includes('تطبيق') || lower.includes('اندرويد') || lower.includes('android') || lower.includes('play')) {
        aiResponse = 'قمت بنشر تطبيقين رسميين على متجر Google Play: "مستحبات السنن" لمتابعة الأذكار والسنن اليومية، و"مسبحتي" للمحاكاة الرقمية لخاتم التسبيح. كلاهما حاز على تقييمات إيجابية 5.0 نجوم.';
      } else if (lower.includes('3d') || lower.includes('ثلاثي') || lower.includes('سيار') || lower.includes('three')) {
        aiResponse = 'تجربة سيارة الـ 3D تم بناؤها باستخدام مكتبة Three.js مع WebGL، وتم تحسين النموذج عبر ضغط DRACO لضمان سرعة تحميل فائقة مع مؤثرات واقعية وتغيير ألوان الطلاء مباشرة في المتصفح.';
      } else if (lower.includes('سعر') || lower.includes('تكلف')) {
        aiResponse = 'تعتمد التكلفة على متطلبات المشروع وحجم الميزات التقنية (ويب عادي، تطبيق جوال، أو واجهة ثلاثية الأبعاد تفاعلية). يمكنك مراسلتي لنحدد النطاق معاً!';
      } else if (lower.includes('سلام') || lower.includes('مرحبا') || lower.includes('هلا') || lower.includes('hi') || lower.includes('hello')) {
        aiResponse = 'أهلاً وسهلاً بك! أنا المساعد الذكي لمحمد أحمد. كيف يمكنني مساعدتك اليوم؟ يمكنك استعراض المشاريع أو سؤالي عن أي مهارة أو تجربة.';
      } else {
        aiResponse = `شكراً لسؤالك! أنا المساعد الذكي الخاص بالموقع. بخصوص "${trimmed}"، يمكنك استعراض مشاريع محمد بكتابة "projects"، أو مهاراته بكتابة "skills"، أو التواصل معه مباشرة عبر الروابط في الموقع.`;
      }

      output = (
        <div style={{ lineHeight: 1.6, background: 'rgba(56, 189, 248, 0.08)', padding: '0.6rem 0.85rem', borderRadius: '8px', borderRight: '3px solid var(--accent-cyan)' }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
            <Sparkles size={14} />
            <span>رد المساعد الذكي (Ma16q AI):</span>
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
            <span>bash + AI — mohamed@iau-workstation:~</span>
            <span className="terminal-ai-badge">
              <Sparkles size={11} /> AI Enabled
            </span>
          </div>
          <button type="button" className="term-close-icon" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <span>➜</span>
                <span style={{ color: '#818cf8' }}>~</span>
                <strong style={{ color: '#f8fafc' }}>{item.command}</strong>
              </div>
              <div style={{ marginTop: '0.25rem', paddingLeft: '1rem', color: '#cbd5e1' }}>
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
              placeholder="اكتب أمرك أو سؤالك (help, مشاريع, من أنت؟)..."
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
            {QUICK_CHIPS.map((chip, i) => (
              <button
                key={i}
                type="button"
                className="terminal-chip"
                onClick={() => handleChipClick(chip.cmd)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
