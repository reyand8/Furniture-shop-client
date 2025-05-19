import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface IAuthInputProps {
    label: string;
    type: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    placeholder?: string;
}

export interface IModalConfirmDeleteProps {
    message: string;
    setModalConfirm: (confirm: boolean) => void;
    setModalOpen: (open: boolean) => void;

}