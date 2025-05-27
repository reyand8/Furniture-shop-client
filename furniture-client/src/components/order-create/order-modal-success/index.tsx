import React from 'react';
import { DialogTitle, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import { IOrderModalSuccessProps } from '../../../types/props.interface';
import theme from '../../../assets/theme';
import {
    OrderSuccessDialog,
    OrderSuccessDialogContent
} from '../../../styles/Order.styles';


const OrderModalSuccess: React.FC<IOrderModalSuccessProps> = ({ openModal }) => {
    return (
        <OrderSuccessDialog
            open={openModal}
            fullWidth
            maxWidth="sm">
            <DialogTitle sx={{margin: '0 auto'}}>
                <DoneOutlineIcon sx={{
                    fontSize: 80,
                    color: theme.palette.success.main
                }}/>
            </DialogTitle>
            <OrderSuccessDialogContent>
                <Typography variant="h5" color={theme.palette.text.secondary}>
                    Thank you for your order!
                </Typography>
                <Typography variant="body1" color={theme.palette.text.secondary}>
                    You will be redirected to the Home page...
                </Typography>
            </OrderSuccessDialogContent>
        </OrderSuccessDialog>
    );
};

export default OrderModalSuccess;
