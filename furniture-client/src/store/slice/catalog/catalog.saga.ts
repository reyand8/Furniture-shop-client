import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    ICategory, IProduct, IProductQueryParams,
    IAllProductsResponse, ICreateUpdateCategory, ICreateProduct
} from '../../../types/catalog.interface';
import {
    createCategoryApi, createProductApi,
    getAllProductsApi, getAllProductsByIdsApi,
    getBestSellerProductsApi, getCategoriesApi,
    getProductsBySearchQueryApi, getRelativeProductsApi,
    getSingleProductApi, updateCategoryApi, updateProductApi
} from '../../../services/api/catalog/catalog.api';
import {
    createCategoryFailure,
    createCategoryRequest,
    createCategorySuccess,
    createProductFailure,
    createProductRequest,
    createProductSuccess,
    fetchAllProductsFailure,
    fetchAllProductsRequest,
    fetchAllProductsSuccess,
    fetchBestSellersFailure,
    fetchBestSellersRequest,
    fetchBestSellersSuccess,
    fetchCategoriesFailure,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchProductsByIdsFailure,
    fetchProductsByIdsRequest,
    fetchProductsByIdsSuccess,
    fetchRelativeFailure,
    fetchRelativeRequest,
    fetchRelativeSuccess,
    fetchSingleProductFailure,
    fetchSingleProductRequest,
    fetchSingleProductSuccess,
    searchFailure,
    searchRequest,
    searchSuccess,
    updateCategoryFailure,
    updateCategoryRequest,
    updateCategorySuccess,
    updateProductFailure,
    updateProductRequest,
    updateProductSuccess
} from './catalog.slice';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

function* fetchAllProducts(action: PayloadAction<IProductQueryParams>) {
    try {
        const response: IAllProductsResponse = yield call(getAllProductsApi, action.payload);
        yield put(fetchAllProductsSuccess(response));
    } catch (error: any) {
        yield put(fetchAllProductsFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchProductsByIds(action: PayloadAction<{ ids: string[] }>) {
    try {
        const response: IProduct[] = yield call(getAllProductsByIdsApi, action.payload.ids);
        yield put(fetchProductsByIdsSuccess(response));
    } catch (error: any) {
        yield put(fetchProductsByIdsFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchSingleProduct(action: PayloadAction<string>) {
    try {
        const response: IProduct = yield call(getSingleProductApi, action.payload);
        yield put(fetchSingleProductSuccess(response));
    } catch (error: any) {
        yield put(fetchSingleProductFailure(getErrorMessage(error, FAILED)));
    }
}

function* updateProduct(action: PayloadAction<{ data: IProduct, id: string }>) {
    try {
        const response: IProduct = yield call(updateProductApi, {
            id: action.payload.id,
            data: action.payload.data
        });
        yield put(updateProductSuccess(response));
    } catch (error: any) {
        yield put(updateProductFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchRelativeProducts(action: PayloadAction<{ type: string }>) {
    try {
        const response: IProduct[] = yield call(getRelativeProductsApi, action.payload.type);
        yield put(fetchRelativeSuccess(response));
    } catch (error: any) {
        yield put(fetchRelativeFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchBestSellerProducts() {
    try {
        const response: IProduct[] = yield call(getBestSellerProductsApi);
        yield put(fetchBestSellersSuccess(response));
    } catch (error: any) {
        yield put(fetchBestSellersFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchProductsBySearchQuery(action: PayloadAction<string>) {
    try {
        const response: IProduct[] = yield call(getProductsBySearchQueryApi, action.payload);
        yield put(searchSuccess(response));
    } catch (error: any) {
        yield put(searchFailure(getErrorMessage(error, FAILED)));
    }
}

function* fetchCategories() {
    try {
        const response: ICategory[] = yield call(getCategoriesApi);
        yield put(fetchCategoriesSuccess(response));
    } catch (error: any) {
        yield put(fetchCategoriesFailure(getErrorMessage(error, FAILED)));
    }
}

function* createCategory(action: PayloadAction<{ data: ICreateUpdateCategory }>) {
    try {
        const response: ICategory = yield call(createCategoryApi, action.payload.data);
        yield put(createCategorySuccess(response));
    } catch (error: any) {
        yield put(createCategoryFailure(getErrorMessage(error, FAILED)));
    }
}

function* updateCategories(action: PayloadAction<{ data: ICreateUpdateCategory, id: string }>) {
    try {
        const response: ICategory = yield call(updateCategoryApi, {
            id: action.payload.id,
            data: action.payload.data
        });
        yield put(updateCategorySuccess(response));
    } catch (error: any) {
        yield put(updateCategoryFailure(getErrorMessage(error, FAILED)));
    }
}

function* createProduct(action: PayloadAction<ICreateProduct>) {
    try {
        const response: IProduct = yield call(createProductApi, action.payload);
        yield put(createProductSuccess(response));
    } catch (error: any) {
        yield put(createProductFailure(getErrorMessage(error, FAILED)));
    }
}

export function* catalogSaga() {
    yield takeLatest(fetchAllProductsRequest.type, fetchAllProducts);
    yield takeLatest(createProductRequest.type, createProduct);
    yield takeLatest(updateProductRequest.type, updateProduct);
    yield takeLatest(fetchProductsByIdsRequest.type, fetchProductsByIds);
    yield takeLatest(fetchSingleProductRequest.type, fetchSingleProduct);
    yield takeLatest(fetchRelativeRequest.type, fetchRelativeProducts);
    yield takeLatest(fetchBestSellersRequest.type, fetchBestSellerProducts);
    yield takeLatest(searchRequest.type, fetchProductsBySearchQuery);
    yield takeLatest(fetchCategoriesRequest.type, fetchCategories);
    yield takeLatest(createCategoryRequest.type, createCategory);
    yield takeLatest(updateCategoryRequest.type, updateCategories);
}