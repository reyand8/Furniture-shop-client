import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { ProfileInfoLabel } from '../../../styles/Profile.styles';
import { InputNotesField } from '../../../styles/Order.styles';
import { AppDispatch } from '../../../store/store';
import { setNewOrderNotes } from '../../../store/slice/order/order.slice';


const OrderNotes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [notes, setNotes] = useState('');

    useEffect((): void => {
        if (notes.trim() !== '') {
            dispatch(setNewOrderNotes(notes));
        }
    }, [notes, dispatch]);

    return (
        <Box sx={{maxWidth: '340px', width: '100%'}}>
            <ProfileInfoLabel>Notes</ProfileInfoLabel>
            <InputNotesField
                type="text"
                placeholder="Optional: any instructions or comments"
                value={notes}
                onChange={(e): void => setNotes(e.target.value)}
            />
        </Box>
    );
};

export default OrderNotes;