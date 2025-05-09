import { IAuthResponse, IRegister } from '../types/user.interface';
import axiosInstance from '../instances/axiosInstance';


export const registerUser = async (data: IRegister): Promise<IAuthResponse> => {
    const response =
        await axiosInstance.post<IAuthResponse>('/auth/register', data);
    return response.data;
};
