import * as yup from 'yup';

import { VALIDATION_MESSAGES }  from '../messages/messages';
import { EOrderStatus } from '../../../types/order.interface';


const { ORDER_STATUS_REQUIRED } = VALIDATION_MESSAGES;

export const orderStatusSchema = yup.object().shape({
    status: yup
        .string()
        .trim()
        .oneOf(Object.values(EOrderStatus), 'Invalid order status')
        .required(ORDER_STATUS_REQUIRED)
});