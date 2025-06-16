import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import { ProfileInfoLabel } from '../../../styles/Profile.styles';
import { InputNotesField } from '../../../styles/Order.styles';
import { AppDispatch } from '../../../store/store';
import { setNewOrderNotes } from '../../../store/slice/order/order.slice';


/**
 * Component for adding optional notes or instructions to a new order.
 *
 * - Renders a controlled text input for user to enter notes.
 * - Updates Redux store with notes whenever input changes and is not empty.
 */
const OrderNotes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [notes, setNotes] = useState('');

    /**
     * Effect to dispatch the current notes to the Redux store.
     * Runs whenever `notes` changes and is not just whitespace.
     */
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