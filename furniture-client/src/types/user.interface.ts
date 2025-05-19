import { ReactNode } from 'react';

import { IApiError } from './error.interface';


export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUpdateUser {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: IApiError;
    updateError: IApiError;
    updateSuccess: boolean;
}

export interface IProfileInfoProps {
    user: IUser | null;
}

export interface IProfileMenuItems {
    label: string;
    icon: ReactNode;
    path?: string;
}