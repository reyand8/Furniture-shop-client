import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../../common/constants';
import { ACCESS_TOKEN_KEY } from '../../common/common-items';

/**
 * Creates a pre-configured Axios instance with a base URL.
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

/**
 * Attaches the access token from local storage to the Authorization header
 * of every outgoing request, if the token exists.
 */
axiosInstance.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;