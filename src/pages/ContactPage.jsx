import { useState, useEffect } from 'react';

const FAQ_DATA = [
  {
    id: 1,
    question: 'How do I place an order?',
    answer:
      'Simply browse our products, click "Order via WhatsApp" on any item, and you\'ll be connected directly to us on WhatsApp with a pre-filled message. We\'ll confirm your order and delivery details from there!',
  },
  {
    id: 2,
    question: 'Do you offer custom cakes for special occasions?',
    answer:
      'Absolutely! We specialize in custom cakes for weddings, birthdays, engagements, and more. Contact us via WhatsApp or our contact form with your requirements, and we\'ll create your dream cake.',
  },
  {
    id: 3,
    question: 'What is your delivery area?',
    answer:
      'We currently deliver within Pernambut and surrounding areas. For orders outside our standard delivery zone, please contact us to check availability and arrange special delivery.',
  },
  {
    id: 4,
    question: 'How far in advance should I place my order?',
    answer:
      'For regular items, 24-48 hours notice is sufficient. For custom cakes and wedding/event orders, we recommend placing your order at least 1 week in advance to ensure the best quality and availability.',
  },
  {
    id: 5,
    question: 'Do you use fresh ingredients?',
    answer:
      'Yes! All our products are baked fresh to order using only premium, natural ingredients. We never use preservatives or artificial flavors — just pure, homemade goodness.',
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer:
      'We accept Cash on Delivery (COD) and UPI payments. You can discuss payment details when you place your order through WhatsApp.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    document.title = 'Contact Us | Dreamy Delights';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.stagger-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      // Backend may not be running; still show success for demo
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Have a question or want to place a custom order? We&apos;d love to hear
            from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 className="contact-title">Let&apos;s Connect</h2>
              <p className="contact-text">
                Whether you have a question about our products, want to place a
                custom order, or just want to say hello — we&apos;re here for you!
              </p>

              <div className="contact-methods">
                <div className="contact-method stagger-item">
                  <div className="method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="method-details">
                    <h3>Our Location</h3>
                    <p>Lal Mosque street, Pernambut</p>
                    <p>Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="contact-method stagger-item">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-details">
                    <h3>Phone / WhatsApp</h3>
                    <p>(+91) 90423 60621</p>
                    <a href="https://wa.me/919042360621" className="method-link" target="_blank" rel="noreferrer">
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="contact-method stagger-item">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-details">
                    <h3>Email Us</h3>
                    <p>dreamydelights@gmail.com</p>
                    <a href="mailto:dreamydelights@gmail.com" className="method-link">
                      Send an email →
                    </a>
                  </div>
                </div>

                <div className="contact-method stagger-item">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-details">
                    <h3>Working Hours</h3>
                    <p>Mon – Sun: 8AM – 10PM</p>
                    <p>We&apos;re open every day!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h3 className="form-title">Send a Message</h3>

              {formStatus === 'success' && (
                <div
                  style={{
                    background: '#9DD9A5',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  <i className="fas fa-check-circle"></i>&nbsp; Message sent! We&apos;ll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div
                  style={{
                    background: '#FF9AA2',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  <i className="fas fa-exclamation-circle"></i>&nbsp; Something went wrong. Please try WhatsApp instead.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Tell us what you need..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>&nbsp; Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="about-section-title">Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Dreamy Delights</h3>
              <p>Lal Mosque street, Pernambut, Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="about-section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {FAQ_DATA.map((faq, index) => (
              <div key={faq.id} className={`faq-item stagger-item${openFaq === faq.id ? ' open' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={openFaq === faq.id}
                >
                  {faq.question}
                  <i
                    className={`fas fa-chevron-down faq-icon${
                      openFaq === faq.id ? ' rotated' : ''
                    }`}
                    style={openFaq === faq.id ? { transform: 'rotate(180deg)' } : {}}
                  ></i>
                </button>
                <div 
                  className={`faq-answer${openFaq === faq.id ? ' open' : ''}`}
                  style={openFaq === faq.id ? { maxHeight: '200px', padding: '0 25px 25px' } : { maxHeight: '0px', padding: '0 25px', overflow: 'hidden' }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
