/**
 * API Client for making api calls
 */

import axios from 'axios';
import Cookies from 'js-cookie';
import { CookieNames } from '~/constants/config.constants';
import { baseUrl } from '~/constants/endpoints.constants';
import { useAuthStore } from '~/state-management/auth-store';

// create a axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: To add the auth token to every outgoing request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieNames.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: To handle 401 errors (token expired/invalid)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      //set token state to false
      useAuthStore.getState().resetAuth();
      //remove token from cookie
      Cookies.remove(CookieNames.token, { path: '/' });
      // Force a hard redirect to the login page.
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
