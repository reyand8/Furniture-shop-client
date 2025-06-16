import { IAuthResponse, ILogin, IRegister } from '../../../types/authUser.interface';
import axiosInstance from '../../instance/axiosInstance';


/**
 * Registers a new user with the provided data.
 *
 * @param data - Registration details including email, password, etc.
 * @returns A promise that resolves to the authentication response.
 */
export const registerUser = async (data: IRegister): Promise<IAuthResponse> => {
    const response =
        await axiosInstance.post<IAuthResponse>('/auth/register', data);
    return response.data;
};

/**
 * Logs in a user with the provided credentials.
 *
 * @param credentials - User login credentials (e.g., email and password).
 * @returns A promise that resolves to the authentication response.
 */
export const loginUser = async (credentials: ILogin): Promise<IAuthResponse> => {
    const response =
        await axiosInstance.post<IAuthResponse>('/auth/login', credentials);
    return response.data;
};