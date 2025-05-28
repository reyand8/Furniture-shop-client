import axiosInstance from '../../instance/axiosInstance';
import {
    ICategory,
    IProduct,
    IProductQueryParams,
    IAllProductsResponse,
    IUpdateCategoryParams,
    ICreateUpdateCategory,
    IUpdateProductParams,
    ICreateProduct
} from '../../../types/catalog.interface';


export const getAllProductsApi = async (
    params: IProductQueryParams): Promise<IAllProductsResponse> => {
    const response =
        await axiosInstance.get<IAllProductsResponse>('/catalog/products', {params});
    return response.data;
};

export const getAllProductsByIdsApi = async (ids: string[]): Promise<IProduct[]> => {
    const response =
        await axiosInstance.post<IProduct[]>('/catalog/products-by-ids', { ids });
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

export const createCategoryApi = async (data: ICreateUpdateCategory ): Promise<ICategory> => {
    const response = await axiosInstance.post<ICategory>(`/catalog/category`, data);
    return response.data;
};

export const updateCategoryApi =
    async ({ id, data }: IUpdateCategoryParams): Promise<ICategory> => {
    const response =
        await axiosInstance.put<ICategory>(`/catalog/category/${id}`, data);
    return response.data;
};

export const updateProductApi =
    async ({ id, data }: IUpdateProductParams): Promise<IProduct> => {
    const response =
        await axiosInstance.put<IProduct>(`/catalog/product/${id}`, data);
    return response.data;
};

export const createProductApi =
    async (data: ICreateProduct): Promise<IProduct> => {
    const response =
        await axiosInstance.post<IProduct>('/catalog/product', data);
    return response.data;
};
