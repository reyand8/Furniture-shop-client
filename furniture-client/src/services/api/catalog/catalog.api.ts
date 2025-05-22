import axiosInstance from '../../instance/axiosInstance';
import {ICategory, IProduct, IProductQueryParams, IAllProductsResponse} from '../../../types/catalog.interface';



export const getAllProductsApi = async (
    params: IProductQueryParams): Promise<IAllProductsResponse> => {
    const response =
        await axiosInstance.get<IAllProductsResponse>('/catalog/products', {params});
    return response.data;
};

export const getBestSellerProductsApi = async (): Promise<IProduct[]> => {
    const response = await axiosInstance.get<IProduct[]>('/catalog/top-products');
    return response.data;
};

export const getRelativeProductsApi = async (type: string): Promise<IProduct[]> => {
    const response = await axiosInstance.get<IProduct[]>('/catalog/relative-products',
        { params: { type }});
    return response.data;
};

export const getProductsBySearchQueryApi = async (query: string): Promise<IProduct[]> => {
    if (!query.trim()) return [];
    const response = await axiosInstance.get<IProduct[]>('/catalog/search', {
        params: { name: query },
    });
    return response.data;
};

export const getSingleProductApi =
    async (id: string): Promise<IProduct> => {
        const response =
            await axiosInstance.get<IProduct>(`/catalog/product/${id}`);
        return response.data;
};

export const getCategoriesApi = async (): Promise<ICategory[]> => {
        const response =
            await axiosInstance.get<ICategory[]>(`/catalog/categories`);
        return response.data;
    };