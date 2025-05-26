import React from 'react';
import {ButtonProps} from '@mui/material';

import { IAllContactInfo } from './contactInfo.interface';
import { IExistedOrder } from './order.interface';
import { IProduct } from './catalog.interface';
import { IUser } from './user.interface';


export interface IModalConfirmDeleteProps {
    message: string;
    setModalConfirm: (confirm: boolean) => void;
    setModalOpen: (open: boolean) => void;
}

export interface IContactInfoEditProps {
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

export interface ISingleItemProductProps {
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

export interface IOrderItemProps {
    item: IExistedOrder;
}

export interface IOrderItemDetailsProps {
    item: IExistedOrder;
    modalEditOpen: boolean;
    setModalEditOpen: (open: boolean) => void;
}

export interface IOrderModalSuccessProps {
    openModal: boolean;
}

export interface IUserDetailsProps {
    item: IUser;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export interface IAddFormWrapperProps {
    children: React.ReactNode;
    disabled?: boolean;
}