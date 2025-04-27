import api from './api';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure
} from '../store/slices/authSlice';
import { setCookie, removeCookie } from '../utils/cookies';

// Auth service functions
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await api.post('/login', credentials);
    const data = response.data;

    if (data.success) {
      // Store user data and token
      const authData = {
        user: data.user,
        token: data.token
      };

      // Set token in cookie with 7 days expiry
      setCookie('auth_token', data.token, 7);

      dispatch(loginSuccess(authData));
      return authData;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await api.post('/register', userData);
    const data = response.data;

    if (data.success) {
      // Store user data and token
      const authData = {
        user: data.user,
        token: data.token
      };

      // Set token in cookie with 7 days expiry
      setCookie('auth_token', data.token, 7);

      dispatch(registerSuccess(authData));
      return authData;
    } else {
      throw new Error(data.message || 'Registration failed');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    dispatch(registerFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

export const logoutUser = () => {
  // Remove token from cookie
  removeCookie('auth_token');
};
