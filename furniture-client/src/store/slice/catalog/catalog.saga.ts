import { call, put, takeLatest } from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import { IProduct } from '../../../types/catalog.interface';
import {
    getBestSellerProductsApi,
    getProductsBySearchQueryApi
} from '../../../services/api/catalog/catalog.api';
import {
    fetchBestSellersFailure, fetchBestSellersRequest,
    fetchBestSellersSuccess, searchFailure,
    searchRequest, searchSuccess
} from './catalog.slice';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

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
    yield takeLatest(fetchBestSellersRequest.type, fetchBestSellerProducts);
    yield takeLatest(searchRequest.type, fetchProductsBySearchQuery);
}