import { refreshTokenAPI } from '@/lib/apis/userApi';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;

      const storedUserInfo = localStorage.getItem('userInfo');
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

      if (!userInfo?.refreshToken) {
        return Promise.reject(error);
      }

      try {
        const res = await refreshTokenAPI(userInfo.refreshToken);
        const newAccessToken = res.data.accessToken;

        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            ...userInfo,
            accessToken: newAccessToken,
          }),
        );

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
