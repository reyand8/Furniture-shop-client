import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    ICategory, IProduct,
    IProductQueryParams, IAllProductsResponse
} from '../../../types/catalog.interface';
import {
    getAllProductsApi, getAllProductsByIdsApi,
    getBestSellerProductsApi, getCategoriesApi,
    getProductsBySearchQueryApi, getRelativeProductsApi,
    getSingleProductApi
} from '../../../services/api/catalog/catalog.api';
import {
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
    searchSuccess
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

export function* catalogSaga() {
    yield takeLatest(fetchAllProductsRequest.type, fetchAllProducts);
    yield takeLatest(fetchProductsByIdsRequest.type, fetchProductsByIds);
    yield takeLatest(fetchSingleProductRequest.type, fetchSingleProduct);
    yield takeLatest(fetchRelativeRequest.type, fetchRelativeProducts);
    yield takeLatest(fetchBestSellersRequest.type, fetchBestSellerProducts);
    yield takeLatest(searchRequest.type, fetchProductsBySearchQuery);
    yield takeLatest(fetchCategoriesRequest.type, fetchCategories);
}