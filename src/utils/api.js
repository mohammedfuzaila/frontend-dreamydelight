export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is FormData, do not set Content-Type so browser sets it with boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Basic handle unauthorized
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/admin';
  }

  return response;
};
