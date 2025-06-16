import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    createOrderFailure,
    createOrderRequest,
    createOrderSuccess,
    fetchOrdersByAdminFailure,
    fetchOrdersByAdminRequest,
    fetchOrdersByAdminSuccess,
    fetchOrdersFailure,
    fetchOrdersRequest,
    fetchOrdersSuccess,
    updateOrderStatusFailure,
    updateOrderStatusRequest,
    updateOrderStatusSuccess
} from './order.slice';
import {
    ICreateOrder,
    IExistedOrder,
    IOrdersGroupedByStatus,
    IUpdateOrderStatusApi
} from '../../../types/order.interface';
import {
    createOrderApi,
    getOrdersApi,
    getOrdersByAdminApi,
    updateOrderStatusApi
} from '../../../services/api/order/order.api';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

/**
 * Fetches all orders from the API.
 */
function* fetchAllOrders() {
    try {
        const response: IExistedOrder[] = yield call(getOrdersApi);
        yield put(fetchOrdersSuccess(response));
    } catch (error: any) {
        yield put(fetchOrdersFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Fetches orders grouped by status for admin from the API.
 */
function* fetchOrdersByAdmin() {
    try {
        const data: IOrdersGroupedByStatus = yield call(getOrdersByAdminApi);
        yield put(fetchOrdersByAdminSuccess(data));
    } catch (error: any) {
        yield put(fetchOrdersByAdminFailure(error.message));
    }
}

/**
 * Creates a new order using provided data.
 * @param action - Contains order creation data.
 */
function* createOrder(action: PayloadAction<ICreateOrder>) {
    try {
        const response: IExistedOrder = yield call(createOrderApi, action.payload);
        yield put(createOrderSuccess(response));
    } catch (error: any) {
        yield put(createOrderFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Updates the status of an existing order by ID.
 * @param action - Contains updated status data and order ID.
 */
function* updateOrderStatus(action: PayloadAction<{ data: IUpdateOrderStatusApi, id: string }>) {
    try {
        const response: IExistedOrder = yield call(updateOrderStatusApi, action.payload);
        yield put(updateOrderStatusSuccess(response));
    } catch (error: any) {
        yield put(updateOrderStatusFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Root saga that watches for order-related actions and triggers worker sagas.
 */
export function* orderSaga() {
    yield takeLatest(fetchOrdersRequest.type, fetchAllOrders);
    yield takeLatest(fetchOrdersByAdminRequest.type, fetchOrdersByAdmin);
    yield takeLatest(createOrderRequest.type, createOrder);
    yield takeLatest(updateOrderStatusRequest.type, updateOrderStatus);
}