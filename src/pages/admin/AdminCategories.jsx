import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth('/admin/categories/');
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/admin/categories/${editingId}/` : '/admin/categories/';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ text: 'Category saved successfully!', type: 'success' });
        setFormData({ name: '', description: '' });
        setEditingId(null);
        fetchCategories();
      } else {
        setMessage({ text: 'Failed to save category.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, description: category.description });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetchWithAuth(`/admin/categories/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Category deleted.', type: 'success' });
        fetchCategories();
      }
    } catch (err) {
      setMessage({ text: 'Failed to delete category.', type: 'error' });
    }
  };

  if (loading) return <div className="admin-loading">Loading categories...</div>;

  return (
    <div className="admin-categories">
      <h2>Manage Categories</h2>
      
      {message.text && (
        <div className={`admin-alert ${message.type}`}>
          {message.text}
          <button onClick={() => setMessage({ text: '', type: '' })}>&times;</button>
        </div>
      )}

      <div className="admin-card">
        <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
        <form onSubmit={handleSubmit} className="admin-form row-form">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group flex-2">
            <label>Description</label>
            <input 
              type="text" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={() => {
                setEditingId(null);
                setFormData({ name: '', description: '' });
              }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-table-container mt-4">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td>
                  <button className="icon-btn edit" onClick={() => handleEdit(cat)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(cat.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
