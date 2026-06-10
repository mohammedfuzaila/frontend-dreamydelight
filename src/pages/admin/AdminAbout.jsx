import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api';

export default function AdminAbout() {
  const [aboutId, setAboutId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    story_title: 'From Our Family to Yours',
    story_content: '',
    image_url: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth('/admin/about/');
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          const about = data[0];
          setAboutId(about.id);
          setFormData({
            story_title: about.story_title,
            story_content: about.story_content,
            image_url: about.image_url || ''
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Saving...');
    try {
      const url = aboutId ? `/admin/about/${aboutId}/` : '/admin/about/';
      const method = aboutId ? 'PUT' : 'POST';
      
      const submitData = new FormData();
      submitData.append('story_title', formData.story_title);
      submitData.append('story_content', formData.story_content);
      if (formData.image_url && !imageFile) {
        submitData.append('image_url', formData.image_url);
      }
      if (imageFile) {
        submitData.append('image_file', imageFile);
      }

      const res = await fetchWithAuth(url, {
        method,
        body: submitData
      });
      
      if (res.ok) {
        setMessage('About page content saved successfully!');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving.');
    }
  };

  if (loading) return <div className="admin-loading">Loading About Page content...</div>;

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Manage About Page Content</h2>
      </div>

      <div className="admin-form-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {message && <div className="admin-message" style={{ padding: '10px', background: '#e6ffe6', color: 'green', marginBottom: '15px', borderRadius: '8px' }}>{message}</div>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Story Title *</label>
            <input type="text" name="story_title" value={formData.story_title} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Story Content (HTML or plain text) *</label>
            <textarea 
              name="story_content" 
              value={formData.story_content} 
              onChange={handleChange} 
              rows="10" 
              required
              placeholder="Write the about story here. Paragraphs can be separated by double line breaks."
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Story Image Upload</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <small>Leave empty to keep existing image</small>
            </div>
            {!imageFile && formData.image_url && (
              <div className="form-group flex-1">
                <label>Current Image URL/Path</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large">Save Content</button>
          </div>
        </form>
      </div>
    </div>
  );
}
