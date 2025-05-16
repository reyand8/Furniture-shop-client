import React from 'react';

import { AuthTextField } from '../../styles/Auth.styles';
import { IAuthInputProps } from '../../types/props.interface';


const UserFormInput: React.FC<IAuthInputProps> = ({ label, type, registration, error, placeholder }) => {
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

export default UserFormInput;
