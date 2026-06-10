import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* About Column */}
          <div className="footer-column">
            <h3>Dreamy Delights</h3>
            <p>
              Homemade bakery specializing in cakes, brownies, kunafa, and
              chocolates made with love and the finest ingredients.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/dreamy_delight222?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.threads.com/@dreamy_delight222"
                target="_blank"
                rel="noreferrer"
                aria-label="Threads"
              >
                <i className="fa-brands fa-threads"></i>
              </a>
              <a
                href="https://wa.me/919042360621"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Products</Link></li>
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Cakes</Link></li>
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Brownies</Link></li>
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Kunafas</Link></li>
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Chocolates</Link></li>
              <li><Link to="/products"><i className="fas fa-chevron-right"></i> Marriage Packings</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-map-marker-alt"></i> Lal Mosque street, Pernambut</a></li>
              <li><a href="tel:+919042360621"><i className="fas fa-phone"></i> (+91)90423 60621</a></li>
              <li><a href="mailto:dreamydelights@gmail.com"><i className="fas fa-envelope"></i> dreamydelights@gmail.com</a></li>
              <li><a href="#"><i className="fas fa-clock"></i> Mon-Sun: 8AM - 10PM</a></li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; 2023 Dreamy Delights. All rights reserved. | Made with{' '}
            <i className="fas fa-heart" style={{ color: 'var(--primary)' }}></i>{' '}
            for sweet lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
