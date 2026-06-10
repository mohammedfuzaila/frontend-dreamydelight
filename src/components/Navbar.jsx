import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-birthday-cake"></i>
          Dreamy Delight
        </Link>

        <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}>
              <i className="fas fa-home"></i> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}>
              <i className="fas fa-box-open"></i> Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}>
              <i className="fas fa-info-circle"></i> About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}>
              <i className="fas fa-phone"></i> Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
