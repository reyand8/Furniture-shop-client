import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';

import UserFormInput from '../../user-form-input';
import { IApiError } from '../../../types/error.interface';
import { handleAuthError } from '../../../common/utils/errorHandler/authErrorHandler';
import {
    clearSuccess,
    createContactInfoRequest,
    selectContactInfo
} from '../../../store/slice/contactInfo/contactInfo.slice';
import { AppDispatch } from '../../../store/store';
import { contactInfoSchema } from '../../../common/utils/validation/contactInfoValidation';
import { ContactInfoForm } from '../../../styles/ContactInfo.styles';
import { IContactInfo } from '../../../types/contactInfo.interface';


const ContactInfoCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { error, success } = useSelector(selectContactInfo);

    const {
        register: createContactInfo,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(contactInfoSchema),
        defaultValues: {
            companyName: null,
            companyTaxId: null
        }
    });

    useEffect((): void => {
        if (error) {
            handleAuthError(error, setSubmitError);
            return;
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            setShowSuccessMessage(true);
            reset();
            dispatch(clearSuccess());
        }
    }, [success, dispatch, reset]);

    const onSubmit = (data: IContactInfo): void => {
        setSubmitError(null);
        dispatch(createContactInfoRequest(data));
    };

    return (
            <ContactInfoForm onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', gap:'14px', marginTop: '18px' }}>
                    <Box>
                        <UserFormInput
                            label={'Phone'}
                            type="text"
                            registration={createContactInfo('phone')}
                            error={errors.phone}
                        />
                        <UserFormInput
                            label={'Address'}
                            type="text"
                            registration={createContactInfo('address')}
                            error={errors.address}
                        />
                        <UserFormInput
                            label={'Zip Code'}
                            type="text"
                            registration={createContactInfo('zipCode')}
                            error={errors.zipCode}
                        />
                        <UserFormInput
                            label={'City'}
                            type="text"
                            registration={createContactInfo('city')}
                            error={errors.city}
                        />
                    </Box>
                    <Box>
                        <UserFormInput
                            label={'Region'}
                            type="text"
                            registration={createContactInfo('region')}
                            error={errors.region}
                        />
                        <UserFormInput
                            label={'Country'}
                            type="text"
                            registration={createContactInfo('country')}
                            error={errors.country}
                        />
                        <UserFormInput
                            label={'Company Name'}
                            type="text"
                            registration={createContactInfo('companyName')}
                            error={errors.companyName}
                        />
                        <UserFormInput
                            label={'Company Tax Id'}
                            type="text"
                            registration={createContactInfo('companyTaxId')}
                            error={errors.companyTaxId}
                        />
                    </Box>
                </Box>
                { submitError && (
                    <Typography color="error" variant="body2">
                        {submitError}
                    </Typography>
                )}
                {showSuccessMessage && (
                    <Typography color="success.main" variant="body2">
                        Contact Info was successfully created
                    </Typography>
                )}
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ margin: '14px 0 38px 0' }}
                    fullWidth
                >
                    Add Contact Info
                </Button>
            </ContactInfoForm>
    )
}

export default ContactInfoCreate;