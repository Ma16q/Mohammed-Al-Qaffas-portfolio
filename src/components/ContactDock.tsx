import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { MessageCircle, X, Send, Copy, Star, Loader2, CheckCircle2, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { RECIPIENT_EMAIL, sendMessage } from '../lib/sendMessage';
import { copyText } from '../lib/clipboard';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import { Confetti } from './Confetti';
import type { SectionId } from '../hooks/useSectionNav';

interface ContactDockProps {
  onNavigate: (id: SectionId) => void;
}

const FEEDBACK_KEY = 'portfolio-feedback';
const STARS = [1, 2, 3, 4, 5];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1 }
};

// Floating quick-contact button: opens a small panel with contact shortcuts and a star rating.
export const ContactDock: React.FC<ContactDockProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { notify } = useToast();
  const d = t.ui.dock;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [rated, setRated] = useState(() => localStorage.getItem(FEEDBACK_KEY) === 'sent');
  const [celebrate, setCelebrate] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const ringProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 420));

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleMessage = () => {
    setOpen(false);
    onNavigate('contact');
  };

  const handleCopyEmail = async () => {
    if (await copyText(RECIPIENT_EMAIL)) {
      notify(t.ui.toastCopied);
    } else {
      notify(t.ui.toastCopyFailed, 'error');
    }
  };

  const handleSendDirectEmail = async () => {
    await copyText(RECIPIENT_EMAIL);
    notify(language === 'ar' ? 'تم نسخ البريد وجاري فتح تطبيق الإيميل' : 'Email copied & opening mail client');
    const subject = encodeURIComponent(
      language === 'ar' ? 'تواصل مهني مع محمد القفاص (بورتفوليو)' : 'Career Opportunity - Mohamed Al-Qaffas'
    );
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}`;
  };

  const handleSendRating = async () => {
    if (!rating || sending) return;
    setSending(true);
    try {
      await sendMessage(
        {
          name: name.trim() || (language === 'ar' ? 'زائر' : 'Visitor'),
          rating: `${rating} / 5 — ${d.rateLabels[rating - 1]}`,
          note: note.trim() || '—',
          language
        },
        `⭐ تقييم جديد لبورتفوليو Ma16q: ${rating}/5${name.trim() ? ` من ${name.trim()}` : ''}`
      );
      localStorage.setItem(FEEDBACK_KEY, 'sent');
      setRated(true);
      setCelebrate(true);
    } catch (err) {
      console.warn('Feedback send failed:', err);
      notify(d.rateFailed, 'error');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    // Eagerly pre-decode avatar so opening the dock panel is 100% instant (0ms latency)
    const img = new Image();
    img.src = '/favicon.png';
    if ('decode' in img) {
      img.decode().catch(() => {});
    }
  }, []);

  const shownRating = hoverRating || rating;

  return (
    <>
      {/* Pre-render avatar offscreen to guarantee immediate decode in browser GPU cache */}
      <img
        src="/favicon.png"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="sync"
        style={{ position: 'fixed', width: 1, height: 1, opacity: 0, pointerEvents: 'none', top: -100, left: -100 }}
      />
      <AnimatePresence>
        {(scrolled || open) && (
          <motion.div
            ref={rootRef}
            className="contact-dock"
            initial={{ opacity: 0, scale: 0.4, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <AnimatePresence>
              {open && (
                <motion.div
                  className="dock-panel"
                  role="dialog"
                  aria-label={d.title}
                  initial={{ opacity: 0, y: 18, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.92, transition: { duration: 0.16 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <div className="dock-panel-head">
                    <img
                      src="/favicon.png"
                      alt={language === 'ar' ? 'محمد القفاص' : 'Mohamed Al-Qaffas'}
                      className="dock-avatar"
                      loading="eager"
                      decoding="sync"
                      width={44}
                      height={44}
                    />
                    <div className="dock-panel-title">
                    <strong>{d.title}</strong>
                    <span className="dock-status">
                      <span className="status-dot"></span>
                      {d.status}
                    </span>
                  </div>
                </div>

                <motion.div className="dock-actions" variants={listVariants} initial="hidden" animate="show">
                  <motion.button type="button" className="dock-action primary" variants={itemVariants} onClick={handleMessage}>
                    <Send size={16} />
                    <span>{d.message}</span>
                  </motion.button>

                  {/* Long/Vertical Email Bar: Direct Send on click + dedicated Copy Button */}
                  <motion.div
                    className="dock-email-bar"
                    variants={itemVariants}
                    onClick={handleSendDirectEmail}
                    role="button"
                    tabIndex={0}
                    title={language === 'ar' ? 'إرسال بريد إلكتروني مباشر' : 'Send direct email'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSendDirectEmail();
                      }
                    }}
                  >
                    <div className="dock-email-info">
                      <Mail size={15} className="dock-email-icon" />
                      <span className="dock-email-addr">{RECIPIENT_EMAIL}</span>
                    </div>
                    <button
                      type="button"
                      className="dock-copy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyEmail();
                      }}
                      title={d.copyEmail}
                    >
                      <Copy size={13} />
                      <span>{language === 'ar' ? 'نسخ' : 'Copy'}</span>
                    </button>
                  </motion.div>

                  <motion.a
                    href="https://github.com/Ma16q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-action"
                    variants={itemVariants}
                  >
                    <GithubIcon size={18} />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/ma16q/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-action"
                    variants={itemVariants}
                  >
                    <LinkedinIcon size={18} />
                    <span>LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/dev_m.qaffas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dock-action"
                    variants={itemVariants}
                  >
                    <InstagramIcon size={18} />
                    <span>Instagram</span>
                  </motion.a>
                </motion.div>

                {/* Star rating feedback */}
                <div className="dock-rate">
                  {rated ? (
                    <motion.p
                      className="dock-rate-thanks"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{d.rateThanks}</span>
                      {celebrate && <Confetti />}
                    </motion.p>
                  ) : (
                    <>
                      <p className="dock-rate-title">{d.rateTitle}</p>
                      <div
                        className="dock-stars"
                        role="radiogroup"
                        aria-label={d.rateTitle}
                        onPointerLeave={() => setHoverRating(0)}
                      >
                        {STARS.map((value) => (
                          <motion.button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={rating === value}
                            aria-label={d.rateLabels[value - 1]}
                            className={`dock-star ${value <= shownRating ? 'filled' : ''}`}
                            onPointerEnter={() => setHoverRating(value)}
                            onFocus={() => setHoverRating(value)}
                            onBlur={() => setHoverRating(0)}
                            onClick={() => setRating(value)}
                            whileHover={{ scale: 1.22, rotate: -8 }}
                            whileTap={{ scale: 0.82 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 16 }}
                          >
                            <Star size={24} />
                          </motion.button>
                        ))}
                      </div>
                      <p className="dock-rate-label">{shownRating ? d.rateLabels[shownRating - 1] : ' '}</p>

                      <AnimatePresence initial={false}>
                        {rating > 0 && (
                          <motion.div
                            className="dock-rate-form"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <input
                              type="text"
                              className="form-control dock-name-input"
                              maxLength={60}
                              placeholder={d.rateNamePlaceholder || (language === 'ar' ? 'الاسم (اختياري)' : 'Your Name (optional)')}
                              aria-label={d.rateNamePlaceholder || (language === 'ar' ? 'الاسم (اختياري)' : 'Your Name (optional)')}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{ marginBottom: '0.45rem', fontSize: '0.8rem', padding: '0.45rem 0.75rem', borderRadius: '8px' }}
                            />
                            <textarea
                              className="form-control dock-note"
                              rows={2}
                              maxLength={500}
                              placeholder={d.ratePlaceholder}
                              aria-label={d.ratePlaceholder}
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                            <button
                              type="button"
                              className="btn-primary dock-rate-send"
                              disabled={sending}
                              onClick={handleSendRating}
                            >
                              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                              <span>{d.rateSend}</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className={`fab ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? d.close : d.open}
            title={open ? d.close : d.open}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Ring fills as the page is scrolled */}
            <svg className="fab-ring" viewBox="0 0 64 64" aria-hidden="true">
              <motion.circle cx="32" cy="32" r="30" style={{ pathLength: ringProgress }} />
            </svg>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                className="fab-icon"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.16 }}
              >
                {open ? <X size={22} /> : <MessageCircle size={22} />}
              </motion.span>
            </AnimatePresence>
            {!open && <span className="fab-pulse" aria-hidden="true" />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
