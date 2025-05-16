import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../../common/constants';


const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem('accessToken');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;