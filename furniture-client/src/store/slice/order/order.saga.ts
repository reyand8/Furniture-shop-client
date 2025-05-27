import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    createOrderFailure,
    createOrderRequest,
    createOrderSuccess,
    fetchOrdersFailure,
    fetchOrdersRequest,
    fetchOrdersSuccess
} from './order.slice';
import { ICreateOrder, IExistedOrder } from '../../../types/order.interface';
import { createOrderApi, getOrdersApi } from '../../../services/api/order/order.api';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

function* fetchAllOrders() {
    try {
        const response: IExistedOrder[] = yield call(getOrdersApi);
        yield put(fetchOrdersSuccess(response));
    } catch (error: any) {
        yield put(fetchOrdersFailure(getErrorMessage(error, FAILED)));
    }
}

function* createOrder(action: PayloadAction<ICreateOrder>) {
    try {
        const response: IExistedOrder = yield call(createOrderApi, action.payload);
        yield put(createOrderSuccess(response));
    } catch (error: any) {
        yield put(createOrderFailure(getErrorMessage(error, FAILED)));
    }
}

export function* orderSaga() {
    yield takeLatest(fetchOrdersRequest.type, fetchAllOrders);
    yield takeLatest(createOrderRequest.type, createOrder);
}