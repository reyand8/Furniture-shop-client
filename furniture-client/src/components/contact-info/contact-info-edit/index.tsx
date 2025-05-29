import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, Dialog,
    DialogActions, DialogContent,
    DialogTitle
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { IUpdateContactInfo } from '../../../types/contactInfo.interface';
import UserFormInput from '../../user-form/user-form-input';
import { TextFieldBox } from '../../../styles/Auth.styles';
import { AppDispatch } from '../../../store/store';
import {
    clearUpdateError,
    selectContactInfo,
    updateContactInfoRequest,
    clearSuccess
} from '../../../store/slice/contactInfo/contactInfo.slice';
import { contactInfoSchema } from '../../../common/utils/validation/contactInfoValidation';
import { IContactInfoEditProps } from '../../../types/props.interface';
import { contactFieldsFirstColumn, contactFieldsSecondColumn } from '../../../common/common-items';
import { IApiError } from '../../../types/error.interface';
import { handleAuthError } from '../../../common/utils/error-handler/authErrorHandler';
import SubmitError from '../../submit-error';
import theme from '../../../assets/theme';


const ContactInfoEdit: React.FC<IContactInfoEditProps> = ({ item, modalEditOpen, setModalEditOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const { updateError, updateSuccess } = useSelector(selectContactInfo);

    const handleClose = useCallback(() => {
        dispatch(clearUpdateError());
        setModalEditOpen(false);
        dispatch(clearSuccess());
        setSubmitError(null);
    }, [setModalEditOpen, dispatch]);

    const methods = useForm({
        resolver: yupResolver(contactInfoSchema),
        defaultValues: {
            phone: item.phone,
            address: item.address,
            zipCode: item.zipCode,
            city: item.city,
            region: item.region,
            country: item.country,
            companyName: item.companyName,
            companyTaxId: item.companyTaxId,
        },
    });

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (updateError) {
            handleAuthError(updateError, setSubmitError);
            return
        }
    }, [updateError]);

    useEffect((): void => {
        if (updateSuccess && !updateError) {
            handleClose();
        }
    }, [updateSuccess, updateError, handleClose]);

    useEffect((): void => {
        reset(item);
    }, [item, reset]);

    const onSubmit = (data: IUpdateContactInfo): void => {
        const formFieldNames: string[] = [
            ...contactFieldsFirstColumn.map(field => field.name),
            ...contactFieldsSecondColumn.map(field => field.name)
        ];

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(
                ([key]): boolean => formFieldNames.includes(key))
        ) as IUpdateContactInfo;

        setSubmitError(null);
        dispatch(updateContactInfoRequest({ data: filteredData, id: item.id }));
    };

    return (
        <Dialog open={modalEditOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Edit Contact Info</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', gap: '14px', mt: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                {contactFieldsFirstColumn.map(({ name, label }) => (
                                    <UserFormInput key={name} name={name} label={label} />
                                ))}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                {contactFieldsSecondColumn.map(({ name, label }) => (
                                    <UserFormInput key={name} name={name} label={label} />
                                ))}
                            </Box>
                        </Box>
                        {submitError && <SubmitError submitError={submitError} />}
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Edit
                            </Button>
                        </DialogActions>
                    </TextFieldBox>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default ContactInfoEdit;