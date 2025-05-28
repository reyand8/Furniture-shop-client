import axiosInstance from '../../instance/axiosInstance';
import { IUpdateUserByAdmin } from '../../../types/admin.interface';
import { IUser } from '../../../types/user.interface';


export const getUsersByRoleApi =
    async (role: string): Promise<IUser[]> => {
    const response = await axiosInstance.get<IUser[]>('/users', {
        params: { role }
    });
    return response.data;
};

export const updateUserByAdminApi =
    async (userId: string, data: IUpdateUserByAdmin): Promise<IUser[]> => {
    const response = await axiosInstance.put<IUser[]>(`/users/${userId}`, data);
    return response.data;
};