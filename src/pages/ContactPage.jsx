import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

const DEFAULT_FAQ_DATA = [
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
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/faqs/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(DEFAULT_FAQ_DATA);
        }
      })
      .catch(err => {
        console.error("Error fetching FAQs:", err);
        setFaqs(DEFAULT_FAQ_DATA);
      });
  }, []);

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

    document.querySelectorAll('.stagger-item, .fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [faqs]);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            We&apos;d love to hear from you. Reach out for custom orders,
            feedback, or any sweet queries!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info stagger-item">
              <h2>Contact Information</h2>
              <p>
                Ready to make your life sweeter? Contact us directly or use the
                form to send a message.
              </p>

              <div className="info-item">
                <i className="fas fa-phone-alt info-icon"></i>
                <div className="info-details">
                  <h4>Phone / WhatsApp</h4>
                  <p>+91 9363065609</p>
                  <p>+91 9500473215</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-envelope info-icon"></i>
                <div className="info-details">
                  <h4>Email</h4>
                  <p>fuzail@dreamydelights.com</p>
                </div>
              </div>

              <div className="info-item">
                <i className="fas fa-map-marker-alt info-icon"></i>
                <div className="info-details">
                  <h4>Location</h4>
                  <p>Lal Mosque street</p>
                  <p>Pernambut, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="social-links-contact">
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            <div className="contact-form-container stagger-item">
              <h2>Send us a Message</h2>
              {formStatus === 'success' && (
                <div className="alert alert-success">Your message has been sent! We will get back to you soon.</div>
              )}
              {formStatus === 'error' && (
                <div className="alert alert-error">Failed to send message. Please try again.</div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
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
                    placeholder="Order Inquiry"
                    required
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
            {faqs.map((faq, index) => (
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
