import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  
  const [formData, setFormData] = useState({
    author_name: '',
    author_role: '',
    content: '',
    order: 0,
    is_active: true
  });

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth('/admin/testimonials/');
      if (res.ok) setTestimonials(await res.json());
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
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetchWithAuth(`/admin/testimonials/${id}/`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (testimonial) => {
    try {
      const res = await fetchWithAuth(`/admin/testimonials/${testimonial.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !testimonial.is_active }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingTestimonial(null);
    setFormData({ author_name: '', author_role: '', content: '', order: 0, is_active: true });
    setShowForm(true);
  };

  const openEditForm = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author_name: testimonial.author_name,
      author_role: testimonial.author_role,
      content: testimonial.content,
      order: testimonial.order,
      is_active: testimonial.is_active
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTestimonial ? `/admin/testimonials/${editingTestimonial.id}/` : '/admin/testimonials/';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div className="admin-loading">Loading testimonials...</div>;

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Manage Testimonials</h2>
        <button className="btn btn-primary" onClick={openAddForm}>
          <i className="fas fa-plus"></i> Add Testimonial
        </button>
      </div>

      {showForm ? (
        <div className="admin-form-container">
          <h3>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-row">
              <div className="form-group flex-1">
                <label>Author Name *</label>
                <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} required />
              </div>
              <div className="form-group flex-1">
                <label>Author Role</label>
                <input type="text" name="author_role" value={formData.author_role} onChange={handleChange} placeholder="e.g. Happy Customer" />
              </div>
            </div>
            <div className="form-group">
              <label>Content *</label>
              <textarea name="content" value={formData.content} onChange={handleChange} rows="4" required></textarea>
            </div>
            <div className="form-group">
              <label>Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} />
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                Is Active
              </label>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Testimonial</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Role</th>
                <th>Content Snippet</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(t => (
                <tr key={t.id}>
                  <td>{t.author_name}</td>
                  <td>{t.author_role}</td>
                  <td>{t.content.length > 50 ? t.content.substring(0, 50) + '...' : t.content}</td>
                  <td>
                    <button 
                      className={`status-btn ${t.is_active ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleActive(t)}
                    >
                      {t.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>
                    <button className="icon-btn edit" onClick={() => openEditForm(t)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(t.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
