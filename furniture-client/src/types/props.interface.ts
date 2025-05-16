import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface IAuthInputProps {
    label: string;
    type: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    placeholder?: string;
}