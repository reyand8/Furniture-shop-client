import React from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import theme from "../../assets/theme";


const UserFormSelect = ({ name, label, options }: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
        <FormControl sx={{
            '& .MuiInputBase-root': {
                color: theme.palette.text.secondary
            },
        }} fullWidth margin="normal" error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select {...field} label={label}>
                        {options.map((option) => (
                            <MenuItem
                                sx={{color: theme.palette.text.secondary}}
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            <FormHelperText>{error?.message?.toString()}</FormHelperText>
        </FormControl>
    );
};

export default UserFormSelect;
