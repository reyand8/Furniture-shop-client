export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface IAuthResponse {
    access_token: string;
    refresh_token: string;
}

export interface IAuthState {
    accessToken: string | null;
    loading: boolean;
    error: IAuthError;
}

export type IAuthError = string | string[] | null;