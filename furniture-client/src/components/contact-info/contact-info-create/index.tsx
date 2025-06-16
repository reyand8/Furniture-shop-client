import React, { useEffect, useState } from 'react';
import {FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';

import UserFormInput from '../../user-form/user-form-input';
import { IApiError } from '../../../types/error.interface';
import { handleAuthError } from '../../../common/utils/error-handler/authErrorHandler';
import {
    clearSuccess,
    createContactInfoRequest,
    selectContactInfo
} from '../../../store/slice/contactInfo/contactInfo.slice';
import { AppDispatch } from '../../../store/store';
import { contactInfoSchema } from '../../../common/utils/validation/contactInfoValidation';
import { ContactInfoForm } from '../../../styles/ContactInfo.styles';
import { IContactInfo } from '../../../types/contactInfo.interface';
import { contactFieldsFirstColumn, contactFieldsSecondColumn } from '../../../common/common-items';
import SubmitError from '../../submit-error';


/**
 * ContactInfoCreate component provides a form to create new contact information.
 *
 * - Uses react-hook-form with Yup validation schema
 * - Dispatches createContactInfoRequest action on form submit
 * - Handles and displays API errors and success messages
 * - Resets form on successful submission
 */
const ContactInfoCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { error, success } = useSelector(selectContactInfo);

    const methods = useForm({
        resolver: yupResolver(contactInfoSchema),
        defaultValues: {
            companyName: null,
            companyTaxId: null,
        },
    });

    const { handleSubmit, reset } = methods;

    /**
     * Listen for API errors and update local submitError state.
     */
    useEffect((): void => {
        if (error) {
            handleAuthError(error, setSubmitError);
            return;
        }
    }, [error]);

    /**
     * On successful submission, show success message,
     * reset form fields and clear success state in Redux.
     */
    useEffect(() => {
        if (success) {
            setShowSuccessMessage(true);
            reset();
            dispatch(clearSuccess());
        }
    }, [success, dispatch, reset]);

    /**
     * Handle form submission by dispatching create request.
     */
    const onSubmit = (data: IContactInfo): void => {
        setSubmitError(null);
        dispatch(createContactInfoRequest(data));
    };

    return (
        <FormProvider {...methods}>
            <ContactInfoForm onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', gap: '14px', marginTop: '18px' }}>
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
        </FormProvider>
    )
}

export default ContactInfoCreate;