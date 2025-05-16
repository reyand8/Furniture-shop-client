import axiosInstance from '../../instance/axiosInstance';

import { IUpdateUser, IUser } from '../../../types/user.interface';


export const getProfile = async (): Promise<IUser> => {
    const response = await axiosInstance.get<IUser>('/users/me');
    return response.data;
};

export const updateProfile = async (data: IUpdateUser): Promise<IUser> => {
    const response = await axiosInstance.put<IUser>('/users/me', data);
    return response.data;
};

export const deleteProfile = async (): Promise<IUser> => {
    const response =
        await axiosInstance.put<IUser>('/users/me', {isActive: false});
    console.log(response);
    return response.data;
};