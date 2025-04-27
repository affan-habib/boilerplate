import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';
import { getCookie } from '../utils/cookies';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://dev-api.yourepub.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // First try to get token from cookie (preferred)
    let token = getCookie('auth_token');

    // Fallback to Redux store if cookie is not available
    if (!token) {
      const state = store.getState();
      token = state.auth.token;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Logout user if token is invalid
      store.dispatch(logout());

      // Redirect to login page
      window.location.href = '/login';
    }

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response || error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
