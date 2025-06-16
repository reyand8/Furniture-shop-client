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


/**
 * Retrieves all products with optional query parameters (e.g., pagination, filters).
 *
 * @param params - Query parameters for filtering or pagination.
 * @returns A promise that resolves to a list of products and metadata.
 */
export const getAllProductsApi = async (
    params: IProductQueryParams): Promise<IAllProductsResponse> => {
    const response =
        await axiosInstance.get<IAllProductsResponse>('/catalog/products', {params});
    return response.data;
};

/**
 * Retrieves products by a list of product IDs.
 *
 * @param ids - Array of product IDs.
 * @returns A promise that resolves to an array of matching products.
 */
export const getAllProductsByIdsApi = async (ids: string[]): Promise<IProduct[]> => {
    const response =
        await axiosInstance.post<IProduct[]>('/catalog/products-by-ids', { ids });
    return response.data;
};

/**
 * Fetches a list of best-selling products.
 *
 * @returns A promise that resolves to an array of top-selling products.
 */
export const getBestSellerProductsApi = async (): Promise<IProduct[]> => {
    const response = await axiosInstance.get<IProduct[]>('/catalog/top-products');
    return response.data;
};

/**
 * Fetches a list of related products based on a given type.
 *
 * @param type - The product type to find related items for.
 * @returns A promise that resolves to an array of related products.
 */
export const getRelativeProductsApi = async (type: string): Promise<IProduct[]> => {
    const response = await axiosInstance.get<IProduct[]>('/catalog/relative-products',
        { params: { type }});
    return response.data;
};

/**
 * Searches for products by name using a query string.
 *
 * @param query - Search string.
 * @returns A promise that resolves to an array of matching products.
 */
export const getProductsBySearchQueryApi = async (query: string): Promise<IProduct[]> => {
    if (!query.trim()) return [];
    const response = await axiosInstance.get<IProduct[]>('/catalog/search', {
        params: { name: query },
    });
    return response.data;
};

/**
 * Fetches a single product by its ID.
 *
 * @param id - The ID of the product.
 * @returns A promise that resolves to the product.
 */
export const getSingleProductApi =
    async (id: string): Promise<IProduct> => {
        const response =
            await axiosInstance.get<IProduct>(`/catalog/product/${id}`);
        return response.data;
};

/**
 * Retrieves a list of all product categories.
 *
 * @returns A promise that resolves to an array of categories.
 */
export const getCategoriesApi = async (): Promise<ICategory[]> => {
        const response =
            await axiosInstance.get<ICategory[]>(`/catalog/categories`);
        return response.data;
};

/**
 * Creates a new product category.
 *
 * @param data - Category data to create.
 * @returns A promise that resolves to the created category.
 */
export const createCategoryApi = async (data: ICreateUpdateCategory ): Promise<ICategory> => {
    const response = await axiosInstance.post<ICategory>(`/catalog/category`, data);
    return response.data;
};

/**
 * Updates an existing product category by ID.
 *
 * @param id - The ID of the category.
 * @param data - Updated category data.
 * @returns A promise that resolves to the updated category.
 */
export const updateCategoryApi =
    async ({ id, data }: IUpdateCategoryParams): Promise<ICategory> => {
    const response =
        await axiosInstance.put<ICategory>(`/catalog/category/${id}`, data);
    return response.data;
};

/**
 * Updates an existing product by ID.
 *
 * @param id - The ID of the product.
 * @param data - Updated product data.
 * @returns A promise that resolves to the updated product.
 */
export const updateProductApi =
    async ({ id, data }: IUpdateProductParams): Promise<IProduct> => {
    const response =
        await axiosInstance.put<IProduct>(`/catalog/product/${id}`, data);
    return response.data;
};

/**
 * Creates a new product.
 *
 * @param data - Product data to create.
 * @returns A promise that resolves to the created product.
 */
export const createProductApi =
    async (data: ICreateProduct): Promise<IProduct> => {
    const response =
        await axiosInstance.post<IProduct>('/catalog/product', data);
    return response.data;
};
