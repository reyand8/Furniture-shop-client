import { IUser } from './user.interface';
import { IApiError } from './error.interface';

export enum EUserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
}

export type Role = 'ADMIN' | 'USER';

export interface IUserRole {
    role: EUserRole;
}

export interface IAdminState {
    users: IUser[];
    loading: boolean;
    error: IApiError;

    updateUserError: IApiError;
    loadingUser: boolean;
    updateUserSuccess: boolean;

    registerUserSuccess: boolean,
    registerUserError: IApiError,
    registerUserLoading: boolean,
}

export interface IUpdateUserByAdmin {
    role: string;
    isActive: boolean;
}