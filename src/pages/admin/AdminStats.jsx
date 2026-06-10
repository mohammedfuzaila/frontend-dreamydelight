import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    icon: '',
    order: 0,
    is_active: true
  });

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth('/admin/stats/');
      if (res.ok) setStats(await res.json());
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
    if (!window.confirm('Are you sure you want to delete this stat?')) return;
    try {
      const res = await fetchWithAuth(`/admin/stats/${id}/`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (stat) => {
    try {
      const res = await fetchWithAuth(`/admin/stats/${stat.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !stat.is_active }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingStat(null);
    setFormData({ title: '', value: '', icon: 'fas fa-star', order: 0, is_active: true });
    setShowForm(true);
  };

  const openEditForm = (stat) => {
    setEditingStat(stat);
    setFormData({
      title: stat.title,
      value: stat.value,
      icon: stat.icon,
      order: stat.order,
      is_active: stat.is_active
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingStat ? `/admin/stats/${editingStat.id}/` : '/admin/stats/';
      const method = editingStat ? 'PUT' : 'POST';
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

  if (loading) return <div className="admin-loading">Loading stats...</div>;

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Manage Stats (Counting)</h2>
        <button className="btn btn-primary" onClick={openAddForm}>
          <i className="fas fa-plus"></i> Add Stat
        </button>
      </div>

      {showForm ? (
        <div className="admin-form-container">
          <h3>{editingStat ? 'Edit Stat' : 'Add New Stat'}</h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Value *</label>
              <input type="text" name="value" value={formData.value} onChange={handleChange} required placeholder="e.g. 500+" />
            </div>
            <div className="form-group">
              <label>Icon Class</label>
              <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="e.g. fas fa-smile" />
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
              <button type="submit" className="btn btn-primary">Save Stat</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Value</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(s => (
                <tr key={s.id}>
                  <td><i className={s.icon || 'fas fa-star'}></i></td>
                  <td>{s.title}</td>
                  <td>{s.value}</td>
                  <td>{s.order}</td>
                  <td>
                    <button 
                      className={`status-btn ${s.is_active ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleActive(s)}
                    >
                      {s.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td>
                    <button className="icon-btn edit" onClick={() => openEditForm(s)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(s.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No stats found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
