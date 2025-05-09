import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button,
    Link,
    Typography,
} from '@mui/material';

import {
    AuthBox,
    AuthPaper,
    AuthTextField,
    AuthTitle,
    TextFieldBox
} from '../../styles/Auth.styles';
import theme from '../../assets/theme';
import { IRegister } from '../../features/types/user.interface';
import { register } from '../../features/slice/user/userSlice';
import { AppDispatch } from '../../features/store';
import { validateRegisterForm } from '../../common/utils/validation/authValidation';
import { handleAuthError } from '../../common/utils/errorHandler/authErrorHandler';


const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<IRegister>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [errors, setErrors] = useState<IRegister>({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setSubmitError(null);

        const validationErrors: IRegister = validateRegisterForm(formData);

        setErrors(validationErrors);

        const hasErrors: boolean = Object.values(validationErrors)
            .some((msg: string): boolean => msg !== '');

        if (hasErrors) return;

        try {
            await dispatch(register(formData)).unwrap();
            navigate('/profile');
        } catch (err: any) {
            handleAuthError(err, setErrors, setSubmitError);
        }
    };

    return (
        <AuthBox>
            <AuthPaper elevation={10}>
                <AuthTitle>Sign Up</AuthTitle>
                <TextFieldBox>
                    <AuthTextField
                        label="First Name"
                        placeholder="First Name"
                        type="text"
                        variant="outlined"
                        name="firstName"
                        fullWidth
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <AuthTextField
                        label="Last Name"
                        placeholder="Last Name"
                        type="text"
                        variant="outlined"
                        name="lastName"
                        fullWidth
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        helperText={errors.lastName}
                        error={!!errors.lastName}
                    />
                    <AuthTextField
                        label="Email"
                        placeholder="Email"
                        type="email"
                        variant="outlined"
                        name="email"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <AuthTextField
                        label="Password"
                        placeholder="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        fullWidth
                        required
                        value={formData.password}
                        helperText={errors.password}
                        onChange={handleChange}
                        error={!!errors.password}
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
                        onClick={handleSubmit}
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