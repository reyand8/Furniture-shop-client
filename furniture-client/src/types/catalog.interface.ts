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
    loading: boolean;
    error: string | null;
}