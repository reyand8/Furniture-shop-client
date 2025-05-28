import React from 'react';
import { ButtonProps } from '@mui/material';

import { IAllContactInfo } from './contactInfo.interface';
import { IExistedOrder, IUpdateOrderStatusApi } from './order.interface';
import { ICategory, IProduct} from './catalog.interface';
import { IUser } from './user.interface';
import {IApiError} from "./error.interface";


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

export interface ICategoryEditProps {
    item: ICategory;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export interface IStyledProps {
    selected: boolean;
}

export interface IOrderItemAdminProps {
    item: IExistedOrder;
}

export interface IUpdateOrderStatusParams {
    data: IUpdateOrderStatusApi;
    id: string;
}

export interface IOrderStatusEditProps {
    item: IExistedOrder;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export interface IProductItemAdminProps {
    item: IProduct;
}

export interface IUserFormImagesProps {
    name: string;
    label: string;
}

export interface IProductEditProps {
    item: IProduct;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export interface IProductFormFieldsProps {
    productTypeOptions: { value: string; label: string }[];
    categoryOptions: { value: string; label: string }[];
    submitError: IApiError | null;
}