import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

import theme from '../../assets/theme';


const UserFormCheckbox = ({ name, label }: { name: string; label: string }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
        <div>
            <FormControlLabel
                sx={{color: theme.palette.text.secondary}}
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                {...field}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                        )}
                    />
                }
                label={label}
            />
            {error && (
                <FormHelperText error>{error.message?.toString()}</FormHelperText>
            )}
        </div>
    );
};

export default UserFormCheckbox;