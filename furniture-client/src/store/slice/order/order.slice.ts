import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    EPaymentMethod,
    ICreateOrder,
    IExistedOrder,
    IOrderState
} from '../../../types/order.interface';
import { IBasketItem } from '../../../types/basket.interface';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IOrderState = {
    allExistedOrders: [],

    newOrderContactId: '',
    paymentMethod: '',
    newOrderItems: [],
    newOrderNotes: '',
    totalPrice: '',
    loading: false,
    error: null,
    success: false,
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

        clearAllNewItems(state) {
            state.allExistedOrders = [];
            state.newOrderContactId = '';
            state.paymentMethod = '';
            state.newOrderItems = [];
            state.newOrderNotes = '';
            state.totalPrice = '';
            state.success = false;
        }
    },
});

export const {
    fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure,
    createOrderRequest, createOrderSuccess, createOrderFailure,
    setTotalPrice, setNewOrderItems, setNewOrderNotes, setNewOrderContactId,
    setPaymentMethod, clearAllNewItems,
} = orderSlice.actions;


export const selectOrder = (state: RootState): IOrderState => state.order;

export default orderSlice.reducer;