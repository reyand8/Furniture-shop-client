import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IAllContactInfo } from './contactInfo.interface';


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

export interface IContactInfoEdit {
    item: IAllContactInfo;
    setModalEditOpen: (open: boolean) => void;
}

export interface IContactInfoProps {
    item: IAllContactInfo;
}