import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import StatsCounter from '../components/StatsCounter';
import HowItWorks from '../components/HowItWorks';
import { featuredProducts } from '../data/products';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Dreamy Delights | Homemade Bakery in Pernambut';

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

    document.querySelectorAll('.fade-in, .stagger-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Homemade Sweetness, Packed with Love</h1>
            <p>
              Indulge in our freshly baked cakes, brownies, kunafa, and chocolates
              made with the finest ingredients and lots of love.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Order Now
              </Link>
              <Link to="/contact" className="btn btn-outline btn-large">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container">
        <h2 className="section-title fade-in">Our Categories</h2>
        <div className="categories fade-in">
          <Link to="/products" className="category-card stagger-item">
            <img
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Cakes"
              className="category-img"
            />
            <div className="category-name">Cakes 🎂</div>
          </Link>

          <Link to="/products" className="category-card stagger-item">
            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Brownies"
              className="category-img"
            />
            <div className="category-name">Brownies 🍫</div>
          </Link>

          <Link to="/products" className="category-card stagger-item">
            <img src="/dd/kunafa.jpg" alt="Kunafa" className="category-img" />
            <div className="category-name">Kunafa 🥮</div>
          </Link>

          <Link to="/products" className="category-card stagger-item">
            <img
              src="https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Chocolates"
              className="category-img"
            />
            <div className="category-name">Chocolates 🍬</div>
          </Link>

          <Link to="/products" className="category-card stagger-item">
            <img src="/dd/paking.jpg" alt="Marriage Packing" className="category-img" />
            <div className="category-name">Marriage Packing 🎁</div>
          </Link>
        </div>
      </section>

      {/* New Stats Counter Section */}
      <StatsCounter />

      {/* New How It Works Section */}
      <HowItWorks />

      {/* Featured Products Carousel */}
      <section className="container">
        <h2 className="section-title fade-in">Our Specialties</h2>
        <Carousel products={featuredProducts} />
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title fade-in">What Our Customers Say</h2>
          <div className="testimonial-grid fade-in">
            <div className="testimonial-card stagger-item">
              <p className="testimonial-text">
                &ldquo;The best chocolate cake I&apos;ve ever had! Moist, rich, and perfectly
                sweet. Will definitely order again for my next celebration.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Anaikar fuzail</h4>
                  <p>Regular Customer</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card stagger-item">
              <p className="testimonial-text">
                &ldquo;Their kunafa is absolutely authentic and delicious. It reminds me of my
                grandmother&apos;s recipe. Highly recommended!&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Mohd Rimaaz</h4>
                  <p>Food Blogger</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card stagger-item">
              <p className="testimonial-text">
                &ldquo;I ordered the marriage packing for my sister&apos;s wedding, and it was
                beautifully presented. The sweets were fresh and tasted amazing.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Mohd Aamiz</h4>
                  <p>Wedding Planner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
