import axiosInstance from '../../instance/axiosInstance';
import {
    ICreateOrder,
    IExistedOrder,
    IOrdersGroupedByStatus,
} from '../../../types/order.interface';
import { transformOrderData } from '../../../common/utils/transform/transformOrder';
import { IUpdateOrderStatusParams } from '../../../types/props.interface';


/**
 * Fetches all existing orders.
 *
 * @returns A promise that resolves to an array of existing orders.
 */
export const getOrdersApi = async (): Promise<IExistedOrder[]> => {
        const response =
            await axiosInstance.get<IExistedOrder[]>('/orders');
        return response.data;
};

/**
 * Fetches orders grouped by status for admin view.
 *
 * @returns A promise that resolves to grouped orders by their status.
 */
export const getOrdersByAdminApi = async (): Promise<IOrdersGroupedByStatus> => {
    const response =
        await axiosInstance.get<IOrdersGroupedByStatus>('/orders/admin');
    return response.data;
};

/**
 * Creates a new order after transforming input data.
 *
 * @param data - The order data to be created.
 * @returns A promise that resolves to the created order.
 */
export const createOrderApi = async (data: ICreateOrder): Promise<ICreateOrder> => {
    const transformedData = transformOrderData(data);
    const response =
                await axiosInstance.post<ICreateOrder>('/orders', transformedData);
    return response.data;
};

/**
 * Updates the status of an existing order.
 *
 * @param data - New status and optional additional data.
 * @param id - The ID of the order to be updated.
 * @returns A promise that resolves to the updated order.
 */
export const updateOrderStatusApi =
    async ({data, id}: IUpdateOrderStatusParams): Promise<IExistedOrder> => {
    const response =
        await axiosInstance.post<IExistedOrder>(`/orders/update-status/${id}`, data);
    return response.data;
};