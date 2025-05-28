import axiosInstance from '../../instance/axiosInstance';
import {
    ICreateOrder,
    IExistedOrder,
    IOrdersGroupedByStatus,
} from '../../../types/order.interface';
import { transformOrderData } from '../../../common/utils/transform/transformOrder';
import { IUpdateOrderStatusParams } from '../../../types/props.interface';


export const getOrdersApi = async (): Promise<IExistedOrder[]> => {
        const response =
            await axiosInstance.get<IExistedOrder[]>('/orders');
        return response.data;
};

export const getOrdersByAdminApi = async (): Promise<IOrdersGroupedByStatus> => {
    const response =
        await axiosInstance.get<IOrdersGroupedByStatus>('/orders/admin');
    return response.data;
};

export const createOrderApi = async (data: ICreateOrder): Promise<ICreateOrder> => {
    const transformedData = transformOrderData(data);
    const response =
                await axiosInstance.post<ICreateOrder>('/orders', transformedData);
    return response.data;
};

export const updateOrderStatusApi =
    async ({data, id}: IUpdateOrderStatusParams): Promise<IExistedOrder> => {
    const response =
        await axiosInstance.post<IExistedOrder>(`/orders/update-status/${id}`, data);
    return response.data;
};