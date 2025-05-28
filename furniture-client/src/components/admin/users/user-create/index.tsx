import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldBox } from '../../../../styles/Auth.styles';
import UserFormInput from '../../../user-form/user-form-input';
import SubmitError from '../../../submit-error';
import { ProfileTitle } from '../../../../styles/Profile.styles';
import { AppDispatch } from '../../../../store/store';
import { IApiError } from '../../../../types/error.interface';
import { registerSchema } from '../../../../common/utils/validation/authValidation';
import {
    clearRegisterByAdminSuccess,
    registerUserByAdminRequest,
    selectAdmin,
} from '../../../../store/slice/admin/admin.slice';
import { handleAuthError } from '../../../../common/utils/error-handler/authErrorHandler';
import { IRegister } from '../../../../types/authUser.interface';


const UserCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { registerUserError, registerUserSuccess } = useSelector(selectAdmin);

    const methods = useForm<IRegister>({
        resolver: yupResolver(registerSchema),
    });

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (registerUserError) {
            handleAuthError(registerUserError, setSubmitError);
        }
    }, [registerUserError]);

    useEffect((): void => {
        if (registerUserSuccess) {
            setShowSuccessMessage(true);
            reset();
            dispatch(clearRegisterByAdminSuccess());
        }
    }, [registerUserSuccess, dispatch, reset]);

    const onSubmit = (data: IRegister): void => {
        setSubmitError(null);
        dispatch(registerUserByAdminRequest(data));
    };
    return (
        <Box>
            <ProfileTitle>Create User</ProfileTitle>
            <FormProvider {...methods}>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <UserFormInput name="firstName" label="First Name" />
                    <UserFormInput name="lastName" label="Last Name" />
                    <UserFormInput type="email" name="email" label="Email" />
                    <UserFormInput type="password" name="password" label="Password" />
                    {submitError && <SubmitError submitError={submitError} />}
                    { showSuccessMessage && (
                        <Typography color="success.main" variant="body2">
                            User was created successfully.
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ margin: '14px 0 38px 0' }}
                        fullWidth>
                        Add User
                    </Button>
                </TextFieldBox>
            </FormProvider>
        </Box>
    )
}

export default UserCreate;