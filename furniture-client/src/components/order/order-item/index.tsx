import React, {useState} from 'react';
import { Button } from '@mui/material';

import { IOrderItemProps } from '../../../types/props.interface';
import {
    OrderItemMain
} from '../../../styles/Order.styles';
import OrderDetails from '../order-details';
import {
    DialogDetailsBtn,
    DialogDetailsSection,
    DialogInfoOrder,
    DialogInfoText,
    DialogInfoTitle
} from '../../../styles/DialogDetails.styles';


/**
 * OrderItem component displays a summary of a single order.
 *
 * - Shows basic order details such as status, payment info, total, and date
 * - Opens a modal dialog with full details on button click
 *
 * Props:
 * - item: the order item to be displayed
 */
const OrderItem: React.FC<IOrderItemProps> = ({item}) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    /**
     * Opens the order details modal
     */
    const handleDetailsClick = (): void => {
        setIsDetailsModalOpen(true);
    };

    /**
     * Formats the created date to a readable string (MM/DD/YYYY)
     */
    const dateOnly: string = new Date(item.createdAt).toLocaleDateString('en-US');

    const { status, paymentStatus, paymentMethod, totalAmount} = item;

    return (
        <OrderItemMain>
            <DialogDetailsSection>
                <DialogInfoOrder>
                    <DialogInfoTitle>Order Status:</DialogInfoTitle>
                    <DialogInfoText>{status}</DialogInfoText>
                </DialogInfoOrder>
                <DialogInfoOrder>
                    <DialogInfoTitle>Payment Status:</DialogInfoTitle>
                    <DialogInfoText>{paymentStatus}</DialogInfoText>
                </DialogInfoOrder>
                <DialogInfoOrder>
                    <DialogInfoTitle>Payment Method:</DialogInfoTitle>
                    <DialogInfoText>{paymentMethod}</DialogInfoText>
                </DialogInfoOrder>
                <DialogInfoOrder>
                    <DialogInfoTitle>Total Amount:</DialogInfoTitle>
                    <DialogInfoText>{totalAmount} $</DialogInfoText>
                </DialogInfoOrder>
                <DialogInfoOrder>
                    <DialogInfoTitle>Created at:</DialogInfoTitle>
                    <DialogInfoText>{dateOnly}</DialogInfoText>
                </DialogInfoOrder>
            </DialogDetailsSection>
            <DialogDetailsBtn>
                <Button onClick={handleDetailsClick} variant="contained" color="primary" fullWidth>
                    Details
                </Button>
            </DialogDetailsBtn>
            {isDetailsModalOpen && (
                <OrderDetails
                    item={item}
                    modalEditOpen={isDetailsModalOpen}
                    setModalEditOpen={setIsDetailsModalOpen}
                />
            )}
        </OrderItemMain>
    )
}

export default OrderItem;