import React from 'react';

import { InputTextField } from '../../styles/Auth.styles';
import {useFormContext} from "react-hook-form";


const UserFormInput = ({ name, label, type="text" }
                       : { name: string; label: string, type?: string }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];


    return (
        <InputTextField
            type={type}
            label={label}
            placeholder={label}
            fullWidth
            {...register(name)}
            error={!!error}
            helperText={error?.message?.toString()}
        />
    )
};

export default UserFormInput;
