export interface ICategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    isActive: boolean;
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
    relative: IProduct[];
    singleProduct: IProduct | null;
    categories: ICategory[];

    selectedCategory: string | null;
    minPrice: number;
    maxPrice: number;

    currentPage: number;
    totalPages: number;

    loadingCategories: boolean;
    loadingSingle: boolean;
    loadingRelative: boolean;
    loading: boolean;

    errorCategories: string | null;
    errorSingle: string | null;
    errorRelative: string | null;
    error: string | null;
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