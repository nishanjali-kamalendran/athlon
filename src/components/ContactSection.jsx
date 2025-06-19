import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Unified form submission handler using EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    emailjs.send(
      'service_0xh0e63D',
      'template_docqtx3',
      formData,
      '5j81Sv4zwCQAtsjAG'
    ).then((result) => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 3000);
      }, (error) => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        // Optionally, you can log or display error details
      });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>Get in touch with our team</p>
        </div>

        <div className="contact-content">
          {/* Contact info cards */}
          <div className="contact-info">
            {/* Location info */}
            <div className="info-card">
              <div className="info-icon">
                {/* Location SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Location</h3>
                <p>Nationwide Court Network</p>
              </div>
            </div>
            {/* Phone info */}
            <div className="info-card">
              <div className="info-icon">
                {/* Phone SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+94 72 228 8154</p>
              </div>
            </div>
            {/* Email info */}
            <div className="info-card">
              <div className="info-icon">
                {/* Email SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>info@athlon.lk</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                {/* Name input */}
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                {/* Email input */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject input */}
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              {/* Message textarea */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              {/* Submit button with loading state */}
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    {/* Send icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Success message */}
              {submitStatus === 'success' && (
                <div className="success-message">
                  {/* Success icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {/* Error message */}
              {submitStatus === 'error' && (
                <div className="error-message">
                  {/* Error icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;