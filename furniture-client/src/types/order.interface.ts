import { IBasketItem } from './basket.interface';
import { IContactInfo } from './contactInfo.interface';
import { IApiError } from './error.interface';

export enum EOrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

export enum EPaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

export enum EPaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
    PAYPAL = 'PAYPAL',
}

export interface ICreateOrder {
    contactInfoId: string;
    paymentMethod: EPaymentMethod | "";
    orderItems: IBasketItem[];
    newOrderNotes?: string;
}

export interface IOrderState {
    allExistedOrders: IExistedOrder[];
    allAdminOrders: IOrdersGroupedByStatus;

    newOrderContactId: string;
    paymentMethod: EPaymentMethod | '';
    newOrderItems: IBasketItem[];
    newOrderNotes: string;
    totalPrice: string;
    loading: boolean;
    error: IApiError;
    errorUpdateOrderStatus: IApiError;
    success: boolean;
    successUpdateOrderStatus: boolean;
}

interface IOrderUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IOrderItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    quantity: number;
    price: number;
}

export interface IExistedOrder {
    id: string;
    createdAt: string;
    updatedAt: string;
    user: IOrderUser;
    contactInfo: IContactInfo;
    orderItems: IOrderItem[];
    status: EOrderStatus;
    paymentMethod: EPaymentMethod;
    paymentStatus: EPaymentStatus;
    totalAmount: number;
    notes: string | null;
}

export interface IOrdersGroupedByStatus {
    [status: string]: IExistedOrder[];
}

export interface IUpdateOrderStatusApi {
    status: EOrderStatus;
}