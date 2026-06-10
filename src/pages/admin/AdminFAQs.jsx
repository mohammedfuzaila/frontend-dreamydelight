import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    is_active: true
  });

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth('/admin/faqs/');
      if (res.ok) setFaqs(await res.json());
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
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetchWithAuth(`/admin/faqs/${id}/`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (faq) => {
    try {
      const res = await fetchWithAuth(`/admin/faqs/${faq.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !faq.is_active }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '', order: 0, is_active: true });
    setShowForm(true);
  };

  const openEditForm = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      is_active: faq.is_active
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingFaq ? `/admin/faqs/${editingFaq.id}/` : '/admin/faqs/';
      const method = editingFaq ? 'PUT' : 'POST';
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

  if (loading) return <div className="admin-loading">Loading FAQs...</div>;

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Manage FAQs</h2>
        <button className="btn btn-primary" onClick={openAddForm}>
          <i className="fas fa-plus"></i> Add FAQ
        </button>
      </div>

      {showForm ? (
        <div className="admin-form-container">
          <h3>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Question *</label>
              <input type="text" name="question" value={formData.question} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Answer *</label>
              <textarea name="answer" value={formData.answer} onChange={handleChange} rows="4" required></textarea>
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
              <button type="submit" className="btn btn-primary">Save FAQ</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map(f => (
                <tr key={f.id}>
                  <td>{f.question}</td>
                  <td>{f.order}</td>
                  <td>
                    <button 
                      className={`status-btn ${f.is_active ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleActive(f)}
                    >
                      {f.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>
                    <button className="icon-btn edit" onClick={() => openEditForm(f)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(f.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No FAQs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
