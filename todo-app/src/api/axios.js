import axios from 'axios';
import supabase from '../api/supabaseClient';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;