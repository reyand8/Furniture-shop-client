import { IAuthResponse, IRegister } from '../../types/authUser.interface';
import axiosInstance from '../instance/axiosInstance';


export const registerUser = async (data: IRegister): Promise<IAuthResponse> => {
    const response =
        await axiosInstance.post<IAuthResponse>('/auth/register', data);
    return response.data;
};
