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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { handleAuthError } from '../../common/utils/errorHandler/authErrorHandler';
import { loginSchema } from '../../common/utils/validation/authValidation';
import UserFormInput from '../../components/user-form-input';
import { AppDispatch } from '../../store/store';
import { ILogin } from '../../types/authUser.interface';
import { loginRequest, selectAuthUser } from '../../store/slice/authUser/authUser.slice';
import { IApiError } from '../../types/error.interface';
import { PATHS } from '../../routes/paths';
import Header from '../../components/header';


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

    const {
        register: formLogin,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: ILogin): void => {
        setSubmitError(null);
        dispatch(loginRequest(data));
    };

    return (
        <AuthBox>
            <Header />
            <AuthPaper elevation={10}>
                <AuthTitle>Sign In</AuthTitle>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <UserFormInput
                        label="Email"
                        type="email"
                        registration={formLogin('email')}
                        error={errors.email}
                    />
                    <UserFormInput
                        label="Password"
                        type="password"
                        registration={formLogin('password')}
                        error={errors.password}
                    />
                    { submitError && (
                        <Typography color="error" variant="body2">
                            {submitError}
                        </Typography>
                    )}
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