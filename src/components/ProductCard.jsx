import { useState } from 'react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '../data/products';

/**
 * ProductCard – Products page grid layout
 * Has both WhatsApp and Instagram booking options.
 */
export default function ProductCard({ product, onQuickView }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { title, price, image, category, description, badge } = product;

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in ordering: ${title} (Price: ${price})`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="product-card stagger-item">
      {badge && <span className="product-badge">{badge}</span>}

      <div className={`product-img-container ${!imgLoaded ? 'img-skeleton' : ''}`}>
        <img
          src={image}
          alt={title}
          className={`product-img ${imgLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="product-overlay">
          <button
            className="quick-view-btn"
            onClick={() => onQuickView && onQuickView(image, title)}
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">{price}</p>

        <div className="product-actions booking-actions">
          {/* WhatsApp Booking */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
            aria-label={`Order ${title} via WhatsApp`}
          >
            <i className="fab fa-whatsapp"></i> Order via WhatsApp
          </a>

          {/* Instagram Booking */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-instagram"
            aria-label={`Book ${title} via Instagram`}
          >
            <i className="fab fa-instagram"></i> Book via Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
