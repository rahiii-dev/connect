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
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        await axiosInstance.get('/auth/refresh-token');
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError); 
      }
    }

    if (error.response && error.response.status === 403){
      await logout()
      toast.error('Session Expired', {
        description: 'Please login again'
      })
    }

    if (error.response && error.response.status > 500){
      toast.error('Server Down', {
        description: 'Please try after sometime.'
      })
    }

    return Promise.reject(error); 
  }
);

export default axiosInstance;
