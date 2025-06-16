import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BasketOrderBtn, BasketTotal } from '../../../styles/Basket.styles';
import {
    clearAllNewItems,
    createOrderRequest,
    selectOrder
} from '../../../store/slice/order/order.slice';
import { ICreateOrder } from '../../../types/order.interface';
import OrderModalSuccess from '../order-modal-success';
import { BASKET_KEY } from '../../../common/common-items';
import { PATHS } from '../../../routes/paths';


/**
 * Component for creating a new order from basket items.
 *
 * - Displays total price and a Buy button.
 * - Enables order creation only if all required fields are valid.
 * - Dispatches order creation action to Redux.
 * - Shows success modal on successful order creation.
 * - Clears basket and navigates home after order success.
 */
const OrderAdd: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const {
        totalPrice, paymentMethod, newOrderContactId,
        newOrderNotes, newOrderItems, success
    } = useSelector(selectOrder);

    /**
     * Checks if all required data is present and valid to enable the Buy button.
     */
    const isBuyEnabled: boolean =
        !!totalPrice &&
        !totalPrice.startsWith("0") &&
        !!paymentMethod &&
        !!newOrderContactId &&
        newOrderItems.length > 0;

    /**
     * Handles the creation of a new order.
     * Prepares order payload and dispatches create order request.
     */
    const handleCreateOrder = (): void => {
        const orderPayload: ICreateOrder = {
            contactInfoId: newOrderContactId,
            paymentMethod,
            orderItems: newOrderItems,
        };
        if (newOrderNotes?.trim()) {
            orderPayload.newOrderNotes = newOrderNotes.trim();
        }
        dispatch(createOrderRequest(orderPayload));
    };

    /**
     * Effect that runs when the order creation status changes.
     * If successful, opens success modal, clears basket data,
     * navigates home after a delay.
     */
    useEffect(() => {
        if (success) {
            setOpenModal(true);
            setTimeout(() => {
                navigate(PATHS.HOME);
            }, 3000);
            dispatch(clearAllNewItems());
            localStorage.removeItem(BASKET_KEY);
        }
    }, [success, dispatch, navigate]);

    return (
        <Box sx={{ maxWidth: '340px', width: '100%' }}>
            <Box sx={{ display: 'flex', mt: 3 }}>
                <BasketTotal>Total: {totalPrice}</BasketTotal>
            </Box>
            <BasketOrderBtn
                onClick={handleCreateOrder}
                disabled={!isBuyEnabled}
                color="primary"
                variant="contained"
            >
                Buy!
            </BasketOrderBtn>
            {
                openModal && <OrderModalSuccess openModal={openModal}/>
            }
        </Box>
    );
};

export default OrderAdd;
