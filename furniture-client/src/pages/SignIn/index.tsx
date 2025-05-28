import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button, Link, Typography
} from '@mui/material';

import {
    AuthBox,
    AuthPaper,
    AuthTitle,
    TextFieldBox
} from '../../styles/Auth.styles';
import theme from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import {FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { handleAuthError } from '../../common/utils/error-handler/authErrorHandler';
import { loginSchema } from '../../common/utils/validation/authValidation';
import UserFormInput from '../../components/user-form/user-form-input';
import { AppDispatch } from '../../store/store';
import { ILogin } from '../../types/authUser.interface';
import { loginRequest, selectAuthUser } from '../../store/slice/authUser/authUser.slice';
import { IApiError } from '../../types/error.interface';
import { PATHS } from '../../routes/paths';
import Header from '../../components/header';
import SubmitError from '../../components/submit-error';


const SignIn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, accessToken } = useSelector(selectAuthUser);
    const [submitError, setSubmitError] = useState<IApiError>(null);

    useEffect((): void => {
        if (error) {
            handleAuthError(error, setSubmitError);
            return;
        }
        if (accessToken) {
            navigate(PATHS.PROFILE);
        }
    }, [error, accessToken, navigate]);

    const methods = useForm<ILogin>({
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit } = methods;


    const onSubmit = (data: ILogin): void => {
        setSubmitError(null);
        dispatch(loginRequest(data));
    };

    return (
        <AuthBox>
            <Header />
                <AuthPaper elevation={10}>
                    <AuthTitle>Sign In</AuthTitle>
                    <FormProvider {...methods}>
                        <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                            <UserFormInput type="email" name="email" label="Email" />
                            <UserFormInput type="password" name="password" label="Password" />
                            {submitError && <SubmitError submitError={submitError} />}
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ margin: '14px 0' }}
                                fullWidth
                            >
                                Sign In
                            </Button>
                        </TextFieldBox>
                    </FormProvider>
                    <Typography sx={{ color: theme.palette.text.secondary }}>
                        <Link component={RouterLink} to="/signup">
                            Don't have an account? Sign up
                        </Link>
                    </Typography>
                </AuthPaper>
        </AuthBox>
    );
};


export default SignIn;