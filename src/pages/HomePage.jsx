import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import StatsCounter from '../components/StatsCounter';
import HowItWorks from '../components/HowItWorks';
import { featuredProducts } from '../data/products';
import { API_BASE_URL } from '../utils/api';

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

  const DEFAULT_TESTIMONIALS = [
    {
      id: 't1',
      content: "The best chocolate cake I've ever had! Moist, rich, and perfectly sweet. Will definitely order again for my next celebration.",
      author_name: "Anaikar fuzail",
      author_role: "Regular Customer"
    },
    {
      id: 't2',
      content: "Their kunafa is absolutely authentic and delicious. It reminds me of my grandmother's recipe. Highly recommended!",
      author_name: "Mohd Rimaaz",
      author_role: "Food Blogger"
    },
    {
      id: 't3',
      content: "I ordered the marriage packing for my sister's wedding, and it was beautifully presented. The sweets were fresh and tasted amazing.",
      author_name: "Mohd Aamiz",
      author_role: "Wedding Planner"
    }
  ];

  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    fetch(`${API_BASE_URL}/public/testimonials/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      })
      .catch(err => {
        console.error("Error fetching testimonials:", err);
        setTestimonials(DEFAULT_TESTIMONIALS);
      });
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
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card stagger-item">
                <p className="testimonial-text">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{t.author_name}</h4>
                    <p>{t.author_role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
