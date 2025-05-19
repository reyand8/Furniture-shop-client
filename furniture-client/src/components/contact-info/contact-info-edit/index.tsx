import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, Dialog,
    DialogActions, DialogContent,
    DialogTitle
} from '@mui/material';
import React, {useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { IUpdateContactInfo } from '../../../types/contactInfo.interface';
import UserFormInput from '../../user-form-input';
import { TextFieldBox } from '../../../styles/Auth.styles';
import { AppDispatch } from '../../../store/store';
import { updateContactInfoRequest } from '../../../store/slice/contactInfo/contactInfo.slice';
import { contactInfoSchema } from '../../../common/utils/validation/contactInfoValidation';
import { IContactInfoEdit } from '../../../types/props.interface';


const ContactInfoEdit: React.FC<IContactInfoEdit> = ({ item, setModalEditOpen }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = useCallback(() => {
        setModalEditOpen(false);
    }, [setModalEditOpen]);

    const {
        register: editContactInfo,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(contactInfoSchema),
        defaultValues: {
            phone: item.phone,
            address: item.address,
            zipCode: item.zipCode,
            city: item.city,
            region: item.region,
            country: item.country,
            companyName: item.companyName,
            companyTaxId: item.companyTaxId
        }
    });

    useEffect((): void => {
        reset(item);
    }, [item, reset]);

    const onSubmit = (data: IUpdateContactInfo): void => {
        handleClose();
        dispatch(updateContactInfoRequest({ data, id: item.id }));
    };

    return (
        <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Contact Info</DialogTitle>
            <DialogContent>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', gap: '14px', mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <UserFormInput
                                label="Phone"
                                type="text"
                                registration={editContactInfo('phone')}
                                error={errors.phone}
                            />
                            <UserFormInput
                                label="Address"
                                type="text"
                                registration={editContactInfo('address')}
                                error={errors.address}
                            />
                            <UserFormInput
                                label="Zip Code"
                                type="text"
                                registration={editContactInfo('zipCode')}
                                error={errors.zipCode}
                            />
                            <UserFormInput
                                label="City"
                                type="text"
                                registration={editContactInfo('city')}
                                error={errors.city}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <UserFormInput
                                label="Region"
                                type="text"
                                registration={editContactInfo('region')}
                                error={errors.region}
                            />
                            <UserFormInput
                                label="Country"
                                type="text"
                                registration={editContactInfo('country')}
                                error={errors.country}
                            />
                            <UserFormInput
                                label="Company Name"
                                type="text"
                                registration={editContactInfo('companyName')}
                                error={errors.companyName}
                            />
                            <UserFormInput
                                label="Company Tax Id"
                                type="text"
                                registration={editContactInfo('companyTaxId')}
                                error={errors.companyTaxId}
                            />
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </TextFieldBox>
            </DialogContent>
        </Dialog>
    );
};

export default ContactInfoEdit;