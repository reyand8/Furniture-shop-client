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

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface IAuthResponse {
    user: IUser;
    access_token: string;
    refresh_token: string;
}

export interface IAuthState {
    user: IUser | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}