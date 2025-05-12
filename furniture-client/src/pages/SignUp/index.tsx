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
import { IAuthError, IRegister } from '../../types/authUser.interface';
import { registerRequest, selectUser } from '../../store/slice/authUser/authUserSlice';
import { AppDispatch } from '../../store/store';
import { handleAuthError } from '../../common/utils/errorHandler/authErrorHandler';
import { registerSchema } from '../../common/utils/validation/authValidation';
import AuthFormInput from '../../components/auth-form-input';


const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, accessToken } = useSelector(selectUser);
    const [submitError, setSubmitError] = useState<IAuthError>(null);

    useEffect((): void => {
        if (error) {
            handleAuthError(error, setSubmitError);
            return;
        }
        if (accessToken) {
            navigate('/profile');
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
            <AuthPaper elevation={10}>
                <AuthTitle>Sign Up</AuthTitle>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <AuthFormInput
                        label="First Name"
                        type="text"
                        registration={formRegister('firstName')}
                        error={errors.firstName}
                    />
                    <AuthFormInput
                        label="Last Name"
                        type="text"
                        registration={formRegister('lastName')}
                        error={errors.lastName}
                    />
                    <AuthFormInput
                        label="Email"
                        type="email"
                        registration={formRegister('email')}
                        error={errors.email}
                    />
                    <AuthFormInput
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