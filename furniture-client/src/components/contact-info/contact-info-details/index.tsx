import React from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Box, Typography, Button
} from '@mui/material';

import { contactFieldsFirstColumn, contactFieldsSecondColumn } from '../../../common/common-items';
import theme from '../../../assets/theme';
import { IContactInfoEditProps } from '../../../types/props.interface';
import { IContactFields } from '../../../types/common.interface';
import { ContactInfoDetailsBox } from '../../../styles/ContactInfo.styles';


const ContactInfoDetails: React.FC<IContactInfoEditProps> = ({ item, modalEditOpen, setModalEditOpen }) => {
    const handleClose = (): void => {
        setModalEditOpen(false);
    };

    return (
        <Dialog open={modalEditOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Contact Info Details</DialogTitle>
            <DialogContent>
                <ContactInfoDetailsBox>
                    <Box sx={{ flex: 1 }}>
                        {contactFieldsFirstColumn.map(({ name, label }: IContactFields) => (
                            <Box key={name} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {label}:
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {item[name as keyof typeof item] || '-'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        {contactFieldsSecondColumn.map(({ name, label }: IContactFields) => (
                            <Box key={name} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {label}:
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {item[name as keyof typeof item] || '-'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </ContactInfoDetailsBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContactInfoDetails;