import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'abcb1240009m@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-pill">Reach Out</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>

        <div className="contact-card glass-panel">
          {/* Channels Column */}
          <div className="contact-channels">
            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Get in Touch</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Feel free to reach out directly via email, GitHub, or through the contact form below.
            </p>

            <div className="channel-item" onClick={handleCopyEmail} style={{ cursor: 'pointer' }} title="Click to copy email">
              <div className="channel-icon">
                <Mail size={18} />
              </div>
              <div>
                <span className="channel-label">Email (Click to copy)</span>
                <strong className="channel-val">{email}</strong>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: copied ? '#10b981' : 'var(--text-dim)' }}>
                {copied ? '✓ Copied!' : <Copy size={15} />}
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
                <span className="channel-label">GitHub</span>
                <strong className="channel-val">github.com/Ma16q</strong>
              </div>
            </a>

            <div className="channel-item">
              <div className="channel-icon">
                <MapPin size={18} />
              </div>
              <div>
                <span className="channel-label">University / Location</span>
                <strong className="channel-val">IAU Campus, Dammam, Saudi Arabia</strong>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contactName" className="form-label">Your Name</label>
              <input
                type="text"
                id="contactName"
                className="form-control"
                placeholder="e.g. John Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail" className="form-label">Email Address</label>
              <input
                type="email"
                id="contactEmail"
                className="form-control"
                placeholder="e.g. john@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactMessage" className="form-label">Message</label>
              <textarea
                id="contactMessage"
                className="form-control"
                rows={4}
                placeholder="Write your note or project inquiry here..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {submitted ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
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
