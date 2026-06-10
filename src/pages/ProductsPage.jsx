import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products, CATEGORIES } from '../data/products';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  useEffect(() => {
    document.title = 'Our Products | Dreamy Delight';

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
  }, [activeCategory]);

  const filtered =
    activeCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const openLightbox = (img, alt) => {
    setLightboxImg(img);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    setLightboxAlt('');
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Our Delicious Products</h1>
          <p className="page-subtitle">
            Indulge in our freshly baked cakes, brownies, kunafa, and chocolates
            made with the finest ingredients and lots of love.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Lightbox */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="lightbox">
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img src={lightboxImg} alt={lightboxAlt} />
          </div>
        </div>
      )}
    </>
  );
}
