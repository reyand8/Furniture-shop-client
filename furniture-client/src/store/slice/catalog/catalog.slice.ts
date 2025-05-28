import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import {
    ICatalogState,
    ICategory,
    IProduct,
    IProductQueryParams,
    IAllProductsResponse, ICreateUpdateCategory, ICreateProduct
} from '../../../types/catalog.interface';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: ICatalogState = {
    allProducts: [],
    productsByIds: [],
    bestSellers: [],
    searchResults: [],
    relative: [],
    categories: [],
    singleProduct: null,

    currentPage: 1,
    totalPages: 1,
    minPrice: 0,
    maxPrice: 2000,
    selectedCategory: null,

    loadingUpdateProduct: false,
    loadingCreateProduct: false,
    loadingCreateCategory: false,
    loadingUpdateCategory: false,
    loadingProductsByIds: false,
    loadingCategories: false,
    loadingSingle: false,
    loadingRelative: false,
    loading: false,

    errorUpdateProduct: null,
    errorCreateProduct: null,
    errorCreateCategory: null,
    errorUpdateCategory: null,
    errorProductsByIds: null,
    errorCategories: null,
    errorSingle: null,
    errorRelative: null,
    error: null,

    successUpdateProduct: false,
    successCreateProduct: false,
    successCreateCategory: false,
    successUpdateCategory: false,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        fetchAllProductsRequest(state, action: PayloadAction<IProductQueryParams>) {
            state.loading = true;
            state.error = null;
            state.currentPage = action.payload.page ?? 1;
        },
        fetchAllProductsSuccess(state, action: PayloadAction<IAllProductsResponse>) {
            state.loading = false;
            state.allProducts = action.payload.products;
            state.totalPages = action.payload.totalPages;
        },
        fetchAllProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },


        createProductRequest(state, _action: PayloadAction<ICreateProduct>) {
            state.loadingCreateProduct = true;
            state.errorCreateProduct = null;
        },
        createProductSuccess(state, action: PayloadAction<IProduct>) {
            state.loadingCreateProduct = false;
            state.allProducts.push(action.payload);
            state.successCreateProduct = true;
        },
        createProductFailure(state, action: PayloadAction<string>) {
            state.loadingCreateProduct = false;
            state.errorCreateProduct = action.payload || UNKNOWN_ERROR;
        },


        updateProductRequest(state, _action: PayloadAction<{ data: IProduct; id: string }>) {
            state.loadingUpdateProduct = true;
            state.errorUpdateProduct = null;
        },
        updateProductSuccess(state, action: PayloadAction<IProduct>) {
            state.loadingUpdateProduct = false;
            const updatedProduct = action.payload;

            state.allProducts = state.allProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            state.successUpdateProduct = true;
        },
        updateProductFailure(state, action: PayloadAction<string>) {
            state.loadingUpdateProduct = false;
            state.errorUpdateProduct = action.payload || UNKNOWN_ERROR;
        },


        fetchProductsByIdsRequest(state, _action: PayloadAction<{ ids: string[] }>) {
            state.loadingProductsByIds = true;
            state.errorProductsByIds = null;
        },
        fetchProductsByIdsSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loadingProductsByIds = false;
            state.productsByIds = action.payload;
        },
        fetchProductsByIdsFailure(state, action: PayloadAction<string>) {
            state.loadingProductsByIds = false;
            state.errorProductsByIds = action.payload || UNKNOWN_ERROR;
        },


        fetchSingleProductRequest(state, _action: PayloadAction<string>) {
            state.loadingSingle = true;
            state.errorSingle = null;
        },
        fetchSingleProductSuccess(state, action: PayloadAction<IProduct>) {
            state.loadingSingle = false;
            state.singleProduct = action.payload;
        },
        fetchSingleProductFailure(state, action: PayloadAction<string>) {
            state.loadingSingle = false;
            state.errorSingle = action.payload || UNKNOWN_ERROR;
        },


        fetchBestSellersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBestSellersSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loading = false;
            state.bestSellers = action.payload;
        },
        fetchBestSellersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },


        fetchRelativeRequest(state,  _action: PayloadAction<{ type: string }>) {
            state.loadingRelative = true;
            state.errorRelative = null;
        },
        fetchRelativeSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loadingRelative = false;
            state.relative = action.payload;
        },
        fetchRelativeFailure(state, action: PayloadAction<string>) {
            state.loadingRelative = false;
            state.errorRelative = action.payload || UNKNOWN_ERROR;
        },


        searchRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
        searchSuccess(state, action: PayloadAction<IProduct[]>) {
            state.searchResults = action.payload;
            state.loading = false;
        },
        searchFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },


        fetchCategoriesRequest(state) {
            state.loadingCategories = true;
            state.errorCategories = null;
        },
        fetchCategoriesSuccess(state, action: PayloadAction<ICategory[]>) {
            state.loadingCategories = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailure(state, action: PayloadAction<string>) {
            state.loadingCategories = false;
            state.errorCategories = action.payload || UNKNOWN_ERROR;
        },


        createCategoryRequest(state, _action: PayloadAction<{ data: ICreateUpdateCategory }>): void {
            state.loadingCreateCategory = true;
            state.errorCreateCategory = null;
        },
        createCategorySuccess(state,
                                 action: PayloadAction<ICategory>): void {
            state.loadingCreateCategory = false;
            state.successCreateCategory = true;
            state.categories.push(action.payload);
        },
        createCategoryFailure(state,
                                 action: PayloadAction<string>): void {
            state.loadingCreateCategory = false;
            state.errorCreateCategory = action.payload || UNKNOWN_ERROR;
        },


        updateCategoryRequest(state,
                                 _action: PayloadAction<{ data: ICreateUpdateCategory, id: string }>): void {
            state.loadingUpdateCategory = true;
            state.errorUpdateCategory = null;
        },
        updateCategorySuccess(state, action: PayloadAction<ICategory>): void {
            state.loadingUpdateCategory = false;
            const index: number = state.categories.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            } else {
                state.categories.push(action.payload);
            }
            state.successUpdateCategory = true;
        },
        updateCategoryFailure(state,
                                 action: PayloadAction<string>): void {
            state.loadingUpdateCategory = false;
            state.errorUpdateCategory = action.payload || UNKNOWN_ERROR;
        },


        setFilters(state, action: PayloadAction<{ selectedCategory: string | null; minPrice: number; maxPrice: number }>) {
            state.selectedCategory = action.payload.selectedCategory;
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
        clearSearchResults(state) {
            state.searchResults = [];
        },
        clearSuccess(state) {
            state.successUpdateCategory = false;
            state.successUpdateProduct = false;
            state.successCreateProduct = false;
        },
        clearSuccessCreateCategory(state) {
            state.successCreateCategory= false;
        }
    },
});

export const {
    fetchAllProductsRequest, fetchAllProductsSuccess, fetchAllProductsFailure,
    fetchProductsByIdsRequest, fetchProductsByIdsSuccess, fetchProductsByIdsFailure,
    createProductRequest, createProductSuccess, createProductFailure,
    updateProductRequest, updateProductSuccess, updateProductFailure,
    fetchSingleProductRequest, fetchSingleProductSuccess, fetchSingleProductFailure,
    fetchRelativeRequest, fetchRelativeSuccess, fetchRelativeFailure,
    fetchBestSellersRequest, fetchBestSellersSuccess, fetchBestSellersFailure,
    searchRequest, searchSuccess, searchFailure,
    fetchCategoriesRequest, fetchCategoriesSuccess, fetchCategoriesFailure,
    createCategoryRequest, createCategorySuccess, createCategoryFailure,
    updateCategoryRequest, updateCategorySuccess, updateCategoryFailure,
    setFilters, clearSearchResults, clearSuccess,
    clearSuccessCreateCategory
} = catalogSlice.actions;


export const selectCatalog = (state: RootState): ICatalogState => state.catalog;

export default catalogSlice.reducer;
