import axios from 'axios';

// Normalize base URL to avoid duplicate /api/v1 when env already includes it.
const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const normalizedBaseUrl = rawBaseUrl
  .replace(/\/+$/, '')
  .replace(/\/api\/v1$/, '')
  .replace(/\/api$/, '');

const apiClient = axios.create({
  baseURL: `${normalizedBaseUrl}/api/v1/`,
  // Removemos Content-Type fijo para que axios lo detecte automáticamente
  // según el tipo de datos (JSON, FormData, etc.)
});

// Interceptor para agregar token automáticamente y configurar Content-Type
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('recetas_flaites_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Solo agregar Content-Type JSON si no es FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    // Para FormData, axios configurará automáticamente multipart/form-data
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
