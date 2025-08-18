import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('recetas_flaites_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
