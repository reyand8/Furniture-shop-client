import { ICreateOrder } from '../../../types/order.interface';
import { IBasketItem } from '../../../types/basket.interface';


/**
 * Transforms raw order data into the format expected by the API.
 *
 * @param data - The original order data input from the form or state.
 * @returns Transformed order payload with contact info, payment method, and items.
 */
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