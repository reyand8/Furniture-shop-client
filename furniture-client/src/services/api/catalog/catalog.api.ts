import axiosInstance from '../../instance/axiosInstance';

import { IProduct } from '../../../types/catalog.interface';


export const getBestSellerProductsApi = async (): Promise<IProduct[]> => {
    const response = await axiosInstance.get<IProduct[]>('/catalog/top-products');
    return response.data;
};

export const getProductsBySearchQueryApi = async (query: string): Promise<IProduct[]> => {
    if (!query.trim()) return [];
    const response = await axiosInstance.get<IProduct[]>('/catalog/search', {
        params: { name: query },
    });
    return response.data;
};