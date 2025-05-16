import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Link,
    Typography,
} from '@mui/material';

import {
    AuthBox,
    AuthPaper,
    AuthTitle,
    TextFieldBox
} from '../../styles/Auth.styles';
import theme from '../../assets/theme';
import { IRegister } from '../../types/authUser.interface';
import { registerRequest, selectAuthUser } from '../../store/slice/authUser/authUser.slice';
import { AppDispatch } from '../../store/store';
import { handleAuthError } from '../../common/utils/errorHandler/authErrorHandler';
import { registerSchema } from '../../common/utils/validation/authValidation';
import UserFormInput from '../../components/user-form-input';
import { IApiError } from '../../types/error.interface';
import { PATHS } from '../../routes/paths';
import Header from '../../components/header';


const SignUp: React.FC = () => {
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
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: IRegister): void => {
        setSubmitError(null);
        dispatch(registerRequest(data));
    };

    return (
        <AuthBox>
            <Header />
            <AuthPaper elevation={10}>
                <AuthTitle>Sign Up</AuthTitle>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <UserFormInput
                        label="First Name"
                        type="text"
                        registration={formRegister('firstName')}
                        error={errors.firstName}
                    />
                    <UserFormInput
                        label="Last Name"
                        type="text"
                        registration={formRegister('lastName')}
                        error={errors.lastName}
                    />
                    <UserFormInput
                        label="Email"
                        type="email"
                        registration={formRegister('email')}
                        error={errors.email}
                    />
                    <UserFormInput
                        label="Password"
                        type="password"
                        registration={formRegister('password')}
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
                        Sign Up
                    </Button>
                </TextFieldBox>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                    <Link component={RouterLink} to="/login">
                        Already have an account?
                    </Link>
                </Typography>
            </AuthPaper>
        </AuthBox>
    );
};

export default SignUp;