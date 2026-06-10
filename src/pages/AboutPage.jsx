import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState({
    story_title: 'From Our Family to Yours',
    story_content: "Dreamy Delights began in 2019 as a small home kitchen experiment by our founder, Ayisha Siddiqua. What started as baking cakes for family and friends quickly grew into a beloved local bakery known for its exceptional quality and heartfelt creations.\n\nEvery recipe at Dreamy Delights has been perfected over years of experimentation and love. We believe that the best ingredients create the most memorable experiences, which is why we source only the finest chocolates, freshest fruits, and purest ingredients for our creations.\n\nToday, we're proud to serve our community with the same passion and attention to detail that started it all. Each cake, brownie, and pastry is crafted with care, ensuring every bite brings joy to your special moments.",
    image_url: '/dd/file_00000000edfc6243a584dc22186cd098.png'
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/about/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setAboutData(data[0]);
        }
      })
      .catch(err => console.error("Error fetching about content:", err));
  }, []);

  useEffect(() => {
    document.title = 'About Us | Dreamy Delights';

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

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Our Sweet Story</h1>
          <p className="page-subtitle">
            Discover the passion, dedication, and love that goes into every treat
            we create at Dreamy Delight.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-container">
            <div className="story-content">
              <h2 className="story-title">{aboutData.story_title}</h2>
              {aboutData.story_content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return null;
                return <p key={index} className="story-text">{paragraph}</p>;
              })}
            </div>
            <div className="story-image">
              <img
                src={aboutData.image_url || '/dd/file_00000000edfc6243a584dc22186cd098.png'}
                alt="Our Bakery Kitchen"
                className="story-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="about-section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card stagger-item">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="value-title">Made with Love</h3>
              <p className="value-text">
                Every creation is infused with genuine care and passion. We
                believe that the secret ingredient in all our baked goods is the
                love we put into making them.
              </p>
            </div>

            <div className="value-card stagger-item">
              <div className="value-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="value-title">Premium Quality</h3>
              <p className="value-text">
                We source only the finest ingredients from trusted suppliers to
                ensure that every bite is a premium experience that meets the
                highest standards.
              </p>
            </div>

            <div className="value-card stagger-item">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="value-title">Fresh &amp; Natural</h3>
              <p className="value-text">
                All our products are made fresh daily with natural ingredients, no
                preservatives, and no artificial flavors. We believe in honest,
                wholesome baking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="about-section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member stagger-item">
              <img
                src="/dd/file_00000000edfc6243a584dc22186cd098.png"
                alt="Ayisha Siddiqua"
                className="member-photo"
              />
              <h3 className="member-name">Ayisha Siddiqua</h3>
              <p className="member-role">Founder &amp; Head Baker</p>
            </div>

            <div className="team-member">
              <img
                src="/dd/aadil.jpg"
                alt="Aadil Ahmed"
                className="member-photo"
              />
              <h3 className="member-name">Aadil Ahmed</h3>
              <p className="member-role">Lead Tester</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Order?</h2>
          <p className="cta-text">
            Browse our delicious collection and place your order via WhatsApp.
            Fresh, homemade treats delivered with love!
          </p>
          <Link to="/products" className="btn btn-primary">
            Order Now
          </Link>
        </div>
      </section>
    </>
  );
}
