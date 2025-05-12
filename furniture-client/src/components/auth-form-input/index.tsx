import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { AuthTextField } from '../../styles/Auth.styles';


interface IAuthInputProps {
    label: string;
    type: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    placeholder?: string;
}

const AuthFormInput: React.FC<IAuthInputProps> = ({ label, type, registration, error, placeholder }) => {
    return (
        <AuthTextField
            label={label}
            placeholder={placeholder || label}
            type={type}
            fullWidth
            {...registration}
            error={!!error}
            helperText={error?.message}
        />
    );
};

export default AuthFormInput;
