import axios from 'axios';
import { SERVER_ORIGIN } from './constants';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: SERVER_ORIGIN,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { logout } = useAuthStore.getState();

    if (error.code === 'ECONNABORTED') {
      // Handle timeout errors
      toast.error('Request timed out, please try again.');
    } else if (error.response) {
      const status = error.response.status;

      if (status === 500) {
        toast.error('Internal server error. Please try again later.');
      } else if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axiosInstance.get('/auth/refresh-token');
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          await logout();
          return Promise.reject(refreshError);
        }
      } else if (status === 403) {
        await logout()
        toast.error('Session Expired', {
          description: 'Please login again'
        })
      }

    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response from server', {
        description: 'Please check your connection.'
      });
    } else {
      // Something else happened during the request
      toast.error('An unknown error occurred.', {
        description: 'Please try again.'
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
