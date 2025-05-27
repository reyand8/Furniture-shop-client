import { ICreateOrder } from '../../../types/order.interface';
import { IBasketItem } from '../../../types/basket.interface';


export const transformOrderData = (data: ICreateOrder) => {
    return {
        contactInfoId: data.contactInfoId,
        paymentMethod: data.paymentMethod,
        orderItems: data.orderItems.map((item: IBasketItem) => ({
            productId: item.id,
            quantity: item.quantity,
        })),
        ...(data.newOrderNotes?.trim() ? { notes: data.newOrderNotes } : {}),
    };
};