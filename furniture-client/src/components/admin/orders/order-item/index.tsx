import React, {useState} from 'react';
import {
    DialogDetailsBtn,
    DialogDetailsSection,
    DialogInfo, DialogInfoOrder, DialogInfoOrderText,
    DialogInfoText,
    DialogInfoTitle
} from '../../../../styles/DialogDetails.styles';
import { Button } from '@mui/material';

import { OrderCard } from '../../../../styles/Order.styles';
import { IOrderItemAdminProps } from '../../../../types/props.interface';
import OrderDetails from '../../../order/order-details';
import OrderEdit from '../order-edit';


const OrderItem: React.FC<IOrderItemAdminProps> = ({ item }) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDetailsClick = (): void => {
        setIsDetailsModalOpen(true);
    };

    const handleEditClick = (): void => {
        setIsEditModalOpen(true);
    };

    const {
        user: { firstName, lastName, email },
        totalAmount,
        paymentMethod,
        paymentStatus,
        status,
    } = item;

    return (
        <>
            <OrderCard variant="outlined">
                <DialogDetailsSection sx={{ p: 3}}>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Customer:</DialogInfoTitle>
                        <DialogInfoOrderText>{firstName} {lastName}</DialogInfoOrderText>
                    </DialogInfoOrder>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Email:</DialogInfoTitle>
                        <DialogInfoOrderText>{email}</DialogInfoOrderText>
                    </DialogInfoOrder>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Total:</DialogInfoTitle>
                        <DialogInfoOrderText>{totalAmount} $</DialogInfoOrderText>
                    </DialogInfoOrder>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Payment Method:</DialogInfoTitle>
                        <DialogInfoOrderText>{paymentMethod}</DialogInfoOrderText>
                    </DialogInfoOrder>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Payment Status:</DialogInfoTitle>
                        <DialogInfoOrderText>{paymentStatus}</DialogInfoOrderText>
                    </DialogInfoOrder>
                    <DialogInfoOrder>
                        <DialogInfoTitle>Order Status:</DialogInfoTitle>
                        <DialogInfoOrderText>{status}</DialogInfoOrderText>
                    </DialogInfoOrder>
                </DialogDetailsSection>
                <Button onClick={handleDetailsClick}  color="primary" fullWidth>
                    Details
                </Button>
                <DialogDetailsBtn sx={{mt:0, mb:3}}>
                    <Button onClick={handleEditClick} variant="contained" color="primary" fullWidth>
                        Update Order Status
                    </Button>
                </DialogDetailsBtn>
            </OrderCard>
            {isDetailsModalOpen && (
                <OrderDetails
                    item={item}
                    modalEditOpen={isDetailsModalOpen}
                    setModalEditOpen={setIsDetailsModalOpen}
                />
            )}
            {isEditModalOpen && (
                <OrderEdit
                    item={item}
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                />
            )}
        </>

    )
}

export default OrderItem;