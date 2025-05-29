import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    EOrderStatus,
    EPaymentMethod,
    ICreateOrder,
    IExistedOrder,
    IOrdersGroupedByStatus,
    IOrderState,
    IUpdateOrderStatusApi
} from '../../../types/order.interface';
import { IBasketItem } from '../../../types/basket.interface';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IOrderState = {
    allExistedOrders: [],
    allAdminOrders: {},

    newOrderContactId: '',
    paymentMethod: '',
    newOrderItems: [],
    newOrderNotes: '',
    totalPrice: '',

    loading: false,

    error: null,
    errorUpdateOrderStatus: null,

    success: false,
    successUpdateOrderStatus: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess(state, action: PayloadAction<IExistedOrder[]>) {
            state.loading = false;
            state.allExistedOrders = action.payload;
        },
        fetchOrdersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },


        fetchOrdersByAdminRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersByAdminSuccess(state, action: PayloadAction<IOrdersGroupedByStatus>) {
            state.loading = false;
            state.allAdminOrders = action.payload;
        },
        fetchOrdersByAdminFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },


        createOrderRequest(state, _action: PayloadAction<ICreateOrder>) {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state, _action: PayloadAction<IExistedOrder>) {
            state.loading = false;
            state.success = true;
        },
        createOrderFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },


        setTotalPrice(state, action: PayloadAction<string>) {
            state.totalPrice = action.payload;
        },

        setNewOrderContactId(state, action: PayloadAction<string>) {
            state.newOrderContactId = action.payload;
        },
        setNewOrderItems(state, action: PayloadAction<IBasketItem[]>) {
            state.newOrderItems = action.payload;
        },
        setNewOrderNotes(state, action: PayloadAction<string>) {
            state.newOrderNotes = action.payload;
        },
        setPaymentMethod(state, action: PayloadAction<EPaymentMethod>) {
            state.paymentMethod = action.payload;
        },

        updateOrderStatusRequest: (state,
            _action: PayloadAction<{ data: IUpdateOrderStatusApi; id: string }>
        ): void => {
            state.loading = true;
            state.errorUpdateOrderStatus = null;
        },
        updateOrderStatusSuccess: (state, action: PayloadAction<IExistedOrder>) => {
            state.loading = false;
            state.errorUpdateOrderStatus = null;

            const updatedOrder: IExistedOrder = action.payload;
            const newStatus: EOrderStatus = updatedOrder.status;

            for (const status in state.allAdminOrders) {
                state.allAdminOrders[status] = state.allAdminOrders[status].filter(
                    order => order.id !== updatedOrder.id
                );
            }
            if (!state.allAdminOrders[newStatus]) {
                state.allAdminOrders[newStatus] = [];
            }
            state.allAdminOrders[newStatus].push(updatedOrder);
            state.successUpdateOrderStatus = true;
        },

        updateOrderStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errorUpdateOrderStatus = action.payload;
        },

        clearAllNewItems(state) {
            state.allExistedOrders = [];
            state.newOrderContactId = '';
            state.paymentMethod = '';
            state.newOrderItems = [];
            state.newOrderNotes = '';
            state.totalPrice = '';
            state.success = false;
        },

        clearSuccess(state) {
            state.successUpdateOrderStatus = false;
            state.success = false;
        }
    },
});

export const {
    fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure,
    fetchOrdersByAdminRequest, fetchOrdersByAdminSuccess, fetchOrdersByAdminFailure,
    createOrderRequest, createOrderSuccess, createOrderFailure,
    updateOrderStatusRequest, updateOrderStatusSuccess, updateOrderStatusFailure,
    setTotalPrice, setNewOrderItems, setNewOrderNotes, setNewOrderContactId,
    setPaymentMethod, clearAllNewItems, clearSuccess
} = orderSlice.actions;


export const selectOrder = (state: RootState): IOrderState => state.order;

export default orderSlice.reducer;