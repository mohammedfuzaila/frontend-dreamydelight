import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    categoriesCount: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetchWithAuth('/admin/products/'),
          fetchWithAuth('/admin/categories/')
        ]);
        
        if (prodRes.ok && catRes.ok) {
          const products = await prodRes.json();
          const categories = await catRes.json();
          
          setStats({
            totalProducts: products.length,
            activeProducts: products.filter(p => p.is_active).length,
            categoriesCount: categories.length,
          });
          
          setRecentProducts(products.slice(-5).reverse());
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-box"></i></div>
          <div className="stat-info">
            <h4>Total Products</h4>
            <p>{stats.totalProducts}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
          <div className="stat-info">
            <h4>Active Products</h4>
            <p>{stats.activeProducts}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-tags"></i></div>
          <div className="stat-info">
            <h4>Categories</h4>
            <p>{stats.categoriesCount}</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h3>Recently Added Products</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.length > 0 ? recentProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <span className={`status-badge ${product.is_active ? 'active' : 'inactive'}`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center">No recent products.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
