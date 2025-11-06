import axios from 'axios';

// Create an Axios instance with a base URL from environment variables.
// Create React App automatically uses .env files and environment variables
// prefixed with REACT_APP_.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

// Add a request interceptor to include the auth token in every request.
// This avoids having to manually add the Authorization header everywhere.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;