import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Antes de cada petición, pega el token guardado en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si Laravel responde 401 (token expirado o inválido), limpia y manda al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
