import { IApiError } from './error.interface';

export interface ICategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    isActive: boolean;
}

export interface ICreateProduct {
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    currency: string;
    type: string;
    size: string;
    color: string;
    isBestSeller: boolean;
    isAvailable: boolean;
    isActive: boolean;
    category: ICategory;
}

export interface IProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    currency: string;
    images: string[];
    type: string;
    size: string;
    color: string;
    isBestSeller: boolean;
    isAvailable: boolean;
    isActive: boolean;
    category: ICategory;
}

export interface ICatalogState {
    bestSellers: IProduct[];
    searchResults: IProduct[];
    allProducts: IProduct[];
    productsByIds: IProduct[];
    relative: IProduct[];
    singleProduct: IProduct | null;
    categories: ICategory[];

    selectedCategory: string | null;
    minPrice: number;
    maxPrice: number;

    currentPage: number;
    totalPages: number;

    loadingUpdateProduct: boolean;
    loadingCreateProduct: boolean;
    loadingCreateCategory: boolean;
    loadingUpdateCategory: boolean;
    loadingProductsByIds: boolean;
    loadingCategories: boolean;
    loadingSingle: boolean;
    loadingRelative: boolean;
    loading: boolean;

    errorUpdateProduct: IApiError;
    errorCreateProduct: IApiError;
    errorCreateCategory: IApiError;
    errorUpdateCategory: IApiError;
    errorProductsByIds: IApiError;
    errorCategories: IApiError;
    errorSingle: IApiError;
    errorRelative: IApiError;
    error: IApiError;

    successUpdateProduct: boolean;
    successCreateProduct: boolean;
    successCreateCategory: boolean;
    successUpdateCategory: boolean;
}

export interface IProductQueryParams {
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
    category?: string;
}

export interface IAllProductsResponse {
    products: IProduct[];
    totalPages: number;
}

export interface ICreateUpdateCategory {
    name: string;
    isActive: boolean;
}

export interface IUpdateCategoryParams {
    id: string;
    data: ICreateUpdateCategory;
}

export interface IUpdateProductParams {
    id: string;
    data: IProduct;
}

export enum ProductType {
    FURNITURE = 'FURNITURE',
    DECOR = 'DECOR',
    ACCESSORIES = 'ACCESSORIES',
}