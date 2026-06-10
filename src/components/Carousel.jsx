import { useState } from 'react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '../data/products';

/**
 * Carousel – Home page featured products slider
 * Shows WhatsApp + Instagram booking buttons on each card.
 */
export default function Carousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const cardWidth = 330; // 300px card + 30px margin

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="carousel-container fade-in">
      <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous">
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {products.map((product) => {
            const waMessage = encodeURIComponent(
              `Hi! I'm interested in ordering: ${product.title} (Price: ${product.price})`
            );
            const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

            return (
              <div key={product.id} className="product-card-home stagger-item">
                <div className={`product-img-container ${!loadedImages[product.id] ? 'img-skeleton' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`product-img ${loadedImages[product.id] ? 'loaded' : 'loading'}`}
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price}</p>

                  <div className="booking-actions">
                    {/* WhatsApp Booking */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-whatsapp"
                      aria-label={`Order ${product.title} via WhatsApp`}
                    >
                      <i className="fab fa-whatsapp"></i> Order via WhatsApp
                    </a>

                    {/* Instagram Booking */}
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-instagram"
                      aria-label={`Book ${product.title} via Instagram`}
                    >
                      <i className="fab fa-instagram"></i> Book via Instagram
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="carousel-btn next" onClick={handleNext} aria-label="Next">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}
