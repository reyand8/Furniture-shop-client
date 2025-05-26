import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../../common/constants';
import { ACCESS_TOKEN_KEY } from '../../common/common-items';


const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;