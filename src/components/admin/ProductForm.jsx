import { useState } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function ProductForm({ product, categories, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    category: product?.category || (categories[0]?.name || ''),
    description: product?.description || '',
    badge: product?.badge || '',
    is_active: product !== undefined ? product.is_active : true,
    is_featured: product?.is_featured || false,
    order: product?.order || 0,
    image: product?.image || '', // fallback string
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (imageFile) {
      data.append('image_file', imageFile);
    }

    const url = product ? `/admin/products/${product.id}/` : '/admin/products/';
    const method = product ? 'PUT' : 'POST';

    try {
      const res = await fetchWithAuth(url, {
        method,
        body: data,
      });

      if (res.ok) {
        onSuccess();
      } else {
        const errData = await res.json();
        setError(JSON.stringify(errData));
      }
    } catch (err) {
      setError('An error occurred while saving the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-header-actions">
        <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
        <button className="btn btn-secondary" onClick={onClose}>Back</button>
      </div>

      {error && <div className="admin-alert error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form product-form">
        <div className="form-row">
          <div className="form-group flex-2">
            <label>Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group flex-1">
            <label>Price *</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. ₹300" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group flex-1">
            <label>Badge</label>
            <input type="text" name="badge" value={formData.badge} onChange={handleChange} placeholder="e.g. Bestseller" />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label>Image Upload</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <small>Leave empty to keep existing image</small>
          </div>
          {!imageFile && formData.image && (
            <div className="form-group flex-1">
              <label>Current Image Path</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} />
            </div>
          )}
        </div>

        <div className="form-row checkbox-row">
          <label className="checkbox-label">
            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
            Active (Visible)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} />
            Featured
          </label>
        </div>

        <div className="form-actions mt-4">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
