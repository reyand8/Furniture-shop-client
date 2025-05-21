import {
    Button, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle
} from '@mui/material';
import React from 'react';

import { IModalConfirmDeleteProps } from '../../types/props.interface';
import theme from '../../assets/theme';


const ModalConfirmDelete: React.FC<IModalConfirmDeleteProps> =
    ({ message, setModalConfirm, setModalOpen }) => {

    const handleClose = (): void => setModalOpen(false);

    const handleConfirm = (): void => {
        setModalConfirm(true);
        setModalOpen(false);
    };

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle color={theme.palette.text.secondary}>Confirm your action</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirmDelete;