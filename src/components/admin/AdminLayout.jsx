import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/admin');
  };

    const navLinks = [
      { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
      { path: '/admin/products', label: 'Products', icon: 'fas fa-box' },
      { path: '/admin/categories', label: 'Categories', icon: 'fas fa-tags' },
      { path: '/admin/stats', label: 'Stats (Counting)', icon: 'fas fa-sort-numeric-up' },
      { path: '/admin/testimonials', label: 'Testimonials', icon: 'fas fa-star' },
      { path: '/admin/faqs', label: 'FAQs', icon: 'fas fa-question-circle' },
      { path: '/admin/about', label: 'About Content', icon: 'fas fa-info-circle' },
    ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Dreamy Delight</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  <i className={link.icon}></i> {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <header className="admin-header">
          <h3>Welcome, Admin</h3>
          <a href="/" target="_blank" rel="noreferrer" className="view-site-link">
            View Site <i className="fas fa-external-link-alt"></i>
          </a>
        </header>
        <div className="admin-content-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
