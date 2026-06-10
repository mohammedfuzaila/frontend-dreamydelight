import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';
import ProductForm from '../../components/admin/ProductForm';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchWithAuth('/admin/products/'),
        fetchWithAuth('/admin/categories/')
      ]);
      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetchWithAuth(`/admin/products/${id}/`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (product) => {
    try {
      const res = await fetchWithAuth(`/admin/products/${product.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !product.is_active }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? p.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="admin-loading">Loading products...</div>;

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Manage Products</h2>
        <button className="btn btn-primary" onClick={openAddForm}>
          <i className="fas fa-plus"></i> Add Product
        </button>
      </div>

      {showForm ? (
        <ProductForm 
          product={editingProduct} 
          categories={categories}
          onClose={() => setShowForm(false)} 
          onSuccess={() => {
            setShowForm(false);
            fetchData();
          }} 
        />
      ) : (
        <>
          <div className="admin-filters">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
            />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="admin-select"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt={p.title} className="admin-table-img" />
                    </td>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td>
                      <button 
                        className={`status-btn ${p.is_active ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleActive(p)}
                        title="Toggle Status"
                      >
                        {p.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <button className="icon-btn edit" onClick={() => openEditForm(p)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(p.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
