import {ButtonProps} from '@mui/material';

import { IAllContactInfo } from './contactInfo.interface';
import { IProduct } from './catalog.interface';


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

export interface ICarouselSettingsParams {
    itemCount: number;
    maxVisibleSlides?: number;
    infiniteThreshold?: number;
}

export interface ISingleItemProduct {
    item: IProduct | null;
}

export interface IImageItemBoxProps {
    selected?: boolean;
}

export interface IRelativeProductsProps {
    type?: string;
}

export interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    disabledPrev?: boolean;
    disabledNext?: boolean;
}