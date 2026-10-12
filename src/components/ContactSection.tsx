import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Copy, Loader2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const recipientEmail = 'abcb1240009m@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setErrorMessage('');

    try {
      // Send real email via FormSubmit AJAX endpoint directly to recipientEmail
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `📩 رسالة جديدة من بورتفوليو Ma16q: ${formData.name}`,
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        // If first-time activation needed or rate-limited, provide fallback
        if (data.message && data.message.includes('Activation')) {
          setSubmitted(true);
          setErrorMessage(
            isAr
              ? 'تم إرسال الرسالة! (ملاحظة: إذا كانت هذه أول مرة، يُرجى تفعيل النموذج عبر الرابط المرسل لبريدك الإلكتروني).'
              : 'Message sent! (Note: First time submission requires email activation confirmation).'
          );
        } else {
          throw new Error(data.message || 'Error sending message');
        }
      }
    } catch (err: any) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback: Open user email client
      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDirectMailto = () => {
    const subject = encodeURIComponent(`Inquiry from Portfolio - Mohamed Al-Qaffas`);
    const body = encodeURIComponent(
      formData.message
        ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        : 'Hello Mohamed,\n\nI visited your portfolio and would like to connect.'
    );
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">{t.contact.sectionPill}</span>
          <h2 className="section-title">{t.contact.sectionTitle}</h2>
        </div>

        <div className="contact-card glass-panel">
          {/* Channels Column */}
          <div className="contact-channels">
            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>{t.contact.sectionTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {t.contact.subtitle}
            </p>

            <div className="channel-item" onClick={handleCopyEmail} style={{ cursor: 'pointer' }} title={t.contact.emailLabel}>
              <div className="channel-icon">
                <Mail size={18} />
              </div>
              <div>
                <span className="channel-label">{t.contact.emailLabel}</span>
                <strong className="channel-val">{recipientEmail}</strong>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: copied ? '#10b981' : 'var(--text-dim)' }}>
                {copied ? t.contact.copied : <Copy size={15} />}
              </span>
            </div>

            <a
              href="https://github.com/Ma16q"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-item"
              style={{ textDecoration: 'none' }}
            >
              <div className="channel-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <div>
                <span className="channel-label">{t.contact.githubLabel}</span>
                <strong className="channel-val">github.com/Ma16q</strong>
              </div>
            </a>

            <div className="channel-item">
              <div className="channel-icon">
                <MapPin size={18} />
              </div>
              <div>
                <span className="channel-label">{t.contact.locationLabel}</span>
                <strong className="channel-val">{t.contact.locationVal}</strong>
              </div>
            </div>

            {/* Direct Mail Client Quick Action */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={handleDirectMailto}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.65rem 1rem' }}
                title="Open default email application"
              >
                <Mail size={15} />
                <span>{isAr ? 'فتح تطبيق البريد مباشرة (Mail App)' : 'Open in Mail App Directly'}</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Form Column */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contactName" className="form-label">{t.contact.formName}</label>
              <input
                type="text"
                id="contactName"
                className="form-control"
                placeholder={t.contact.namePlaceholder}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail" className="form-label">{t.contact.formEmail}</label>
              <input
                type="email"
                id="contactEmail"
                className="form-control"
                placeholder={t.contact.emailPlaceholder}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactMessage" className="form-label">{t.contact.formMessage}</label>
              <textarea
                id="contactMessage"
                className="form-control"
                rows={4}
                placeholder={t.contact.messagePlaceholder}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            {errorMessage && (
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.8 : 1 }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{isAr ? 'جارٍ إرسال البريد...' : 'Sending Email...'}</span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                  <span>{isAr ? 'تم إرسال الرسالة إلى البريد بنجاح!' : 'Email Sent Successfully!'}</span>
                </>
              ) : (
                <>
                  <span>{t.contact.sendBtn}</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
