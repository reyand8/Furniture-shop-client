import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import { IProduct } from '../../../types/catalog.interface';
import {
    getBestSellerProductsApi, getProductsBySearchQueryApi,
    getRelativeProductsApi, getSingleProductApi
} from '../../../services/api/catalog/catalog.api';
import {
    fetchBestSellersFailure, fetchBestSellersRequest, fetchBestSellersSuccess,
    fetchRelativeFailure, fetchRelativeRequest, fetchRelativeSuccess,
    fetchSingleProductFailure, fetchSingleProductRequest, fetchSingleProductSuccess,
    searchFailure, searchRequest, searchSuccess
} from './catalog.slice';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

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

export function* catalogSaga() {
    yield takeLatest(fetchSingleProductRequest.type, fetchSingleProduct);
    yield takeLatest(fetchRelativeRequest.type, fetchRelativeProducts);
    yield takeLatest(fetchBestSellersRequest.type, fetchBestSellerProducts);
    yield takeLatest(searchRequest.type, fetchProductsBySearchQuery);
}