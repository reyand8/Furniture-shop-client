import React, {useState} from 'react';
import {
    DialogDetailsBtn,
    DialogDetailsSection,
    DialogInfo, DialogInfoOrderAdmin, DialogInfoOrderText,
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
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Customer:</DialogInfoTitle>
                        <DialogInfoOrderText>{firstName} {lastName}</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Email:</DialogInfoTitle>
                        <DialogInfoOrderText>{email}</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Total:</DialogInfoTitle>
                        <DialogInfoOrderText>{totalAmount} $</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Payment Method:</DialogInfoTitle>
                        <DialogInfoOrderText>{paymentMethod}</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Payment Status:</DialogInfoTitle>
                        <DialogInfoOrderText>{paymentStatus}</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
                    <DialogInfoOrderAdmin>
                        <DialogInfoTitle>Order Status:</DialogInfoTitle>
                        <DialogInfoOrderText>{status}</DialogInfoOrderText>
                    </DialogInfoOrderAdmin>
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