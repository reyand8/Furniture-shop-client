import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Link, Typography } from '@mui/material';

import { AuthBox, AuthPaper, AuthTitle, TextFieldBox
} from '../../styles/Auth.styles';
import theme from '../../assets/theme';
import { IRegister } from '../../types/authUser.interface';
import { registerRequest, selectAuthUser } from '../../store/slice/authUser/authUser.slice';
import { AppDispatch } from '../../store/store';
import { handleAuthError } from '../../common/utils/error-handler/authErrorHandler';
import { registerSchema } from '../../common/utils/validation/authValidation';
import UserFormInput from '../../components/user-form/user-form-input';
import { IApiError } from '../../types/error.interface';
import { PATHS } from '../../routes/paths';
import Header from '../../components/header';
import SubmitError from '../../components/submit-error';


/**
 * SignUp component renders the user registration form and handles sign-up process.
 *
 * - Uses react-hook-form with Yup schema validation for input validation.
 * - Dispatches register request on form submission.
 * - Displays API errors via custom error handler.
 * - Redirects to profile page on successful registration.
 * - Includes navigation link to Sign In page.
 */
const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, accessToken } = useSelector(selectAuthUser);
    const [submitError, setSubmitError] = useState<IApiError>(null);

    /**
     * Effect to handle API errors and redirect when user is registered successfully.
     */
    useEffect((): void => {
        if (error) {
            handleAuthError(error, setSubmitError);
            return;
        }
        if (accessToken) {
            navigate(PATHS.PROFILE);
        }
    }, [error, accessToken, navigate]);

    const methods = useForm<IRegister>({
        resolver: yupResolver(registerSchema),
    });

    const { handleSubmit } = methods;

    /**
     * Handles form submission by dispatching register request.
     * @param data - Registration form data.
     */
    const onSubmit = (data: IRegister): void => {
        setSubmitError(null);
        dispatch(registerRequest(data));
    };

    return (
        <AuthBox>
            <Header />
            <AuthPaper elevation={10}>
                <AuthTitle>Sign Up</AuthTitle>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                        <UserFormInput name="firstName" label="First Name"/>
                        <UserFormInput name="lastName" label="Last Name"  />
                        <UserFormInput type="email" name="email" label="Email"  />
                        <UserFormInput type="password" name="password" label="Password"  />
                        {submitError && <SubmitError submitError={submitError} />}
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
                </FormProvider>
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