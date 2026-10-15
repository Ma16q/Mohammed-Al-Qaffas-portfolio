import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, CircleAlert, Loader2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { RECIPIENT_EMAIL, sendMessage } from '../lib/sendMessage';
import { copyText } from '../lib/clipboard';
import { Reveal } from './Reveal';
import { Confetti } from './Confetti';
import { GithubIcon, InstagramIcon } from './BrandIcons';

type Field = 'name' | 'email' | 'message';
type FieldState = 'idle' | 'valid' | 'invalid';
type SubmitStatus = 'idle' | 'sending' | 'sent';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Rendered with a break opportunity after the @ so narrow screens wrap it cleanly
const [EMAIL_USER, EMAIL_DOMAIN] = RECIPIENT_EMAIL.split('@');
const EMPTY_FORM: Record<Field, string> = { name: '', email: '', message: '' };
const UNTOUCHED: Record<Field, boolean> = { name: false, email: false, message: false };
const FIELD_IDS: Record<Field, string> = { name: 'contactName', email: 'contactEmail', message: 'contactMessage' };

const channelList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } }
};
const channelRow = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } }
} as const;

interface FormFieldProps {
  id: string;
  label: string;
  error: string;
  state: FieldState;
  children: React.ReactNode;
}

// Label + input with a live status icon and an error line that slides open
const FormField: React.FC<FormFieldProps> = ({ id, label, error, state, children }) => (
  <div className={`form-group field-${state}`}>
    <label htmlFor={id} className="form-label">{label}</label>
    <div className="field-wrap">
      {children}
      <AnimatePresence mode="wait" initial={false}>
        {state !== 'idle' && (
          <motion.span
            key={state}
            className="field-status"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
          >
            {state === 'valid' ? <Check size={15} /> : <CircleAlert size={15} />}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
    <AnimatePresence initial={false}>
      {state === 'invalid' && (
        <motion.p
          id={`${id}-error`}
          className="field-error"
          role="alert"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [notice, setNotice] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(UNTOUCHED);
  const { language, t } = useLanguage();
  const { notify } = useToast();
  const shake = useAnimationControls();
  const isAr = language === 'ar';

  const invalid: Record<Field, boolean> = {
    name: !formData.name.trim(),
    email: !EMAIL_PATTERN.test(formData.email.trim()),
    message: !formData.message.trim()
  };

  const fieldState = (field: Field): FieldState => {
    if (!touched[field]) return 'idle';
    return invalid[field] ? 'invalid' : 'valid';
  };

  const fieldProps = (field: Field) => ({
    id: FIELD_IDS[field],
    className: 'form-control',
    value: formData[field],
    'aria-invalid': touched[field] && invalid[field],
    'aria-describedby': touched[field] && invalid[field] ? `${FIELD_IDS[field]}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value })),
    onBlur: () => setTouched((prev) => ({ ...prev, [field]: true }))
  });

  // The success state on the button fades back to idle on its own
  useEffect(() => {
    if (status !== 'sent') return;
    const timer = setTimeout(() => setStatus('idle'), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleCopyEmail = async () => {
    if (await copyText(RECIPIENT_EMAIL)) {
      setCopied(true);
      notify(t.ui.toastCopied);
      setTimeout(() => setCopied(false), 2500);
    } else {
      notify(t.ui.toastCopyFailed, 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const firstInvalid = (Object.keys(invalid) as Field[]).find((field) => invalid[field]);
    if (firstInvalid) {
      setTouched({ name: true, email: true, message: true });
      shake.start({ x: [0, -10, 10, -7, 7, -3, 0], transition: { duration: 0.45 } });
      notify(t.ui.toastInvalid, 'error');
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    setStatus('sending');
    setNotice('');

    try {
      const result = await sendMessage(
        { name: formData.name, email: formData.email, message: formData.message },
        `📩 رسالة جديدة من بورتفوليو Ma16q: ${formData.name}`
      );

      setStatus('sent');
      notify(t.contact.sentSuccess);
      if (result.needsActivation) {
        setNotice(t.ui.toastActivation);
      } else {
        setFormData(EMPTY_FORM);
        setTouched(UNTOUCHED);
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback: Open user email client
      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus('idle');
      notify(t.ui.toastSendFallback, 'info');
    }
  };

  const handleDirectMailto = () => {
    const subject = encodeURIComponent(
      isAr
        ? 'فرصة مهنية ومقابلة عمل - محمد القفاص'
        : 'Career Opportunity & Professional Inquiry - Mohamed Al-Qaffas'
    );
    const body = encodeURIComponent(
      formData.message
        ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        : isAr
        ? 'مرحباً محمد،\n\nاطلعت على معرض أعمالك وخبراتك الهندسية ومشاريعك المنشورة، ويسعدني التواصل معك لبحث فرصة مهنية ومناقشة مقابلة عمل أو تعاون مشترك.\n\nمع أطيب التحيات،'
        : 'Hello Mohamed,\n\nI reviewed your portfolio, engineering projects, and published mobile applications, and I would like to connect regarding a career opportunity, interview, or collaborative project.\n\nBest regards,'
    );
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-pill">{t.contact.sectionPill}</span>
          <h2 className="section-title">{t.contact.sectionTitle}</h2>
        </Reveal>

        <Reveal>
          <div className="contact-card glass-panel">
            {/* Channels Column */}
            <motion.div
              className="contact-channels"
              variants={channelList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            >
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>{t.contact.sectionTitle}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {t.contact.subtitle}
              </p>

              <motion.div variants={channelRow}>
                <div
                  className="channel-item"
                  onClick={handleCopyEmail}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCopyEmail();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  title={t.contact.emailLabel}
                >
                  <div className="channel-icon">
                    <Mail size={18} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
                    <span className="channel-label">{t.contact.emailLabel}</span>
                    <strong className="channel-val">{EMAIL_USER}@<wbr />{EMAIL_DOMAIN}</strong>
                  </div>
                  <span className={`channel-action ${copied ? 'is-copied' : ''}`}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied ? 'copied' : 'copy'}
                        initial={{ scale: 0, rotate: -60 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 60 }}
                        transition={{ duration: 0.16 }}
                      >
                        {copied ? <Check size={16} /> : <Copy size={15} />}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
              </motion.div>

              {/* Subgrid: GitHub & Instagram side-by-side to save height */}
              <div className="contact-channels-subgrid">
                <motion.div variants={channelRow}>
                  <a
                    href="https://github.com/Ma16q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-item channel-compact"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="channel-icon">
                      <GithubIcon />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0, flex: 1, overflow: 'hidden' }}>
                      <span className="channel-label">{isAr ? 'جيت هب' : 'GitHub'}</span>
                      <strong className="channel-val text-truncate" title="github.com/Ma16q">Ma16q</strong>
                    </div>
                    <span className="channel-action">
                      <ExternalLink size={14} />
                    </span>
                  </a>
                </motion.div>

                <motion.div variants={channelRow}>
                  <a
                    href="https://www.instagram.com/dev_m.qaffas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-item channel-compact"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="channel-icon" style={{ color: '#e1306c' }}>
                      <InstagramIcon />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0, flex: 1, overflow: 'hidden' }}>
                      <span className="channel-label">{isAr ? 'انستقرام' : 'Instagram'}</span>
                      <strong className="channel-val text-truncate" title="@dev_m.qaffas">@dev_m.qaffas</strong>
                    </div>
                    <span className="channel-action">
                      <ExternalLink size={14} />
                    </span>
                  </a>
                </motion.div>
              </div>

              <motion.div variants={channelRow}>
                <div className="channel-item channel-compact">
                  <div className="channel-icon">
                    <MapPin size={18} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0 }}>
                    <span className="channel-label">{t.contact.locationLabel}</span>
                    <strong className="channel-val">{t.contact.locationVal}</strong>
                  </div>
                </div>
              </motion.div>

              {/* Direct Mail Client Quick Action */}
              <motion.div variants={channelRow} style={{ marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={handleDirectMailto}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.65rem 1rem' }}
                  title="Open default email application"
                >
                  <Mail size={15} />
                  <span>{t.ui.openMailApp}</span>
                  <ExternalLink size={13} />
                </button>
              </motion.div>
            </motion.div>

            {/* Form Column */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <FormField id={FIELD_IDS.name} label={t.contact.formName} error={t.ui.errName} state={fieldState('name')}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={t.contact.namePlaceholder}
                  required
                  {...fieldProps('name')}
                />
              </FormField>

              <FormField id={FIELD_IDS.email} label={t.contact.formEmail} error={t.ui.errEmail} state={fieldState('email')}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  {...fieldProps('email')}
                />
              </FormField>

              <FormField id={FIELD_IDS.message} label={t.contact.formMessage} error={t.ui.errMessage} state={fieldState('message')}>
                <textarea
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  required
                  {...fieldProps('message')}
                ></textarea>
              </FormField>

              {notice && (
                <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                  {notice}
                </div>
              )}

              <motion.div className="submit-wrap" animate={shake}>
                <button
                  type="submit"
                  className={`btn-primary submit-btn is-${status}`}
                  disabled={status === 'sending'}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={status}
                      className="submit-content"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>{t.ui.sending}</span>
                        </>
                      ) : status === 'sent' ? (
                        <>
                          <CheckCircle2 size={18} />
                          <span>{t.ui.sent}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.contact.sendBtn}</span>
                          <Send size={16} className="cta-plane" />
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </button>
                {status === 'sent' && <Confetti />}
              </motion.div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
