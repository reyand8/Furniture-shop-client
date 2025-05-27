import axiosInstance from '../../instance/axiosInstance';
import { ICreateOrder, IExistedOrder } from '../../../types/order.interface';
import { transformOrderData } from '../../../common/utils/transform/transformOrder';


export const getOrdersApi = async (): Promise<IExistedOrder[]> => {
        const response =
            await axiosInstance.get<IExistedOrder[]>('/orders');
        return response.data;
};

export const createOrderApi = async (data: ICreateOrder): Promise<ICreateOrder> => {
    const transformedData = transformOrderData(data);
    const response =
                await axiosInstance.post<ICreateOrder>('/orders', transformedData);
    return response.data;
};