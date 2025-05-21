import { IAllContactInfo } from './contactInfo.interface';
import {ButtonProps} from "@mui/material";


export interface IModalConfirmDeleteProps {
    message: string;
    setModalConfirm: (confirm: boolean) => void;
    setModalOpen: (open: boolean) => void;
}

export interface IContactInfoEdit {
    item: IAllContactInfo;
    modalEditOpen: boolean;
    setModalEditOpen: (open: boolean) => void;
}

export interface IContactInfoProps {
    item: IAllContactInfo;
}

export interface ISubmitErrorProps {
    submitError: string | string[] | null;
}

export interface IStyledButtonProps extends ButtonProps {
    isSelected: boolean;
}