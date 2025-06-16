import React from 'react';
import {
    Box, Button, Dialog, DialogActions,
    DialogContent, DialogTitle,
} from '@mui/material';

import { IOrderItemDetailsProps } from '../../../types/props.interface';
import theme from '../../../assets/theme';
import {
    contactFieldsFirstColumn,
    contactFieldsSecondColumn
} from '../../../common/common-items';
import {
    DialogDetailsMain,
    DialogDetailsSection,
    DialogInfo,
    DialogInfoText,
    DialogInfoTitle,
    OrderDetailsSubtitle
} from '../../../styles/DialogDetails.styles';



/**
 * OrderDetails component displays full details of a specific order.
 *
 * - Shows order summary, payment info, customer data, and contact info
 * - Uses a modal dialog to display details
 * - Accepts order item and modal state management as props
 */
const OrderDetails: React.FC<IOrderItemDetailsProps> = ({ item, modalEditOpen, setModalEditOpen }) => {

    /**
     * Closes the order details modal
     */
    const handleClose = (): void => {
        setModalEditOpen(false);
    };

    /**
     * Computes the total quantity from all order items
     */
    const totalQuantity: number =
        item.orderItems.reduce((sum, item) =>
            sum + item.quantity, 0);

    const {
        status, paymentStatus, paymentMethod,
        totalAmount,  user: { firstName, lastName, email },
    } = item;

    return (
        <Dialog open={modalEditOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Order Details</DialogTitle>
            <DialogContent>
                <DialogDetailsMain>
                    <OrderDetailsSubtitle>Main information</OrderDetailsSubtitle>
                    <DialogDetailsSection>
                        <DialogInfo>
                            <DialogInfoTitle>Order Status:</DialogInfoTitle>
                            <DialogInfoText>{status}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Payment Status:</DialogInfoTitle>
                            <DialogInfoText>{paymentStatus}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Payment Method:</DialogInfoTitle>
                            <DialogInfoText>{paymentMethod}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Total Quantity:</DialogInfoTitle>
                            <DialogInfoText>{totalQuantity}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Total Amount:</DialogInfoTitle>
                            <DialogInfoText>{totalAmount} $</DialogInfoText>
                        </DialogInfo>
                    </DialogDetailsSection>

                    <OrderDetailsSubtitle>Customer details</OrderDetailsSubtitle>
                    <DialogDetailsSection>
                        <DialogInfo>
                            <DialogInfoTitle>First Name:</DialogInfoTitle>
                            <DialogInfoText>{firstName}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Last Name:</DialogInfoTitle>
                            <DialogInfoText>{lastName}</DialogInfoText>
                        </DialogInfo>
                        <DialogInfo>
                            <DialogInfoTitle>Email:</DialogInfoTitle>
                            <DialogInfoText>{email}</DialogInfoText>
                        </DialogInfo>
                    </DialogDetailsSection>

                    <OrderDetailsSubtitle>Contact Info</OrderDetailsSubtitle>
                    <DialogDetailsSection sx={{ display: 'flex', gap: '14px', mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            {contactFieldsFirstColumn.map(({ name, label }) => (
                                <DialogInfo key={name}>
                                    <DialogInfoTitle>{label}:</DialogInfoTitle>
                                    <DialogInfoText>
                                        {item.contactInfo[name as keyof typeof item.contactInfo] || '-'}
                                    </DialogInfoText>
                                </DialogInfo>
                            ))}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            {contactFieldsSecondColumn.map(({ name, label }) => (
                                <DialogInfo key={name}>
                                    <DialogInfoTitle>{label}:</DialogInfoTitle>
                                    <DialogInfoText>
                                        {item.contactInfo[name as keyof typeof item.contactInfo] || '-'}
                                    </DialogInfoText>
                                </DialogInfo>
                            ))}
                        </Box>
                    </DialogDetailsSection>
                </DialogDetailsMain>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderDetails;