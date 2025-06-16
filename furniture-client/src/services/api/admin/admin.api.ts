import axiosInstance from '../../instance/axiosInstance';
import { IUpdateUserByAdmin } from '../../../types/admin.interface';
import { IUser } from '../../../types/user.interface';

/**
 * Fetches a list of users filtered by their role.
 *
 * @param role - The role to filter users by (e.g., "admin", "user").
 * @returns A promise that resolves to an array of IUser objects.
 */
export const getUsersByRoleApi =
    async (role: string): Promise<IUser[]> => {
    const response = await axiosInstance.get<IUser[]>('/users', {
        params: { role }
    });
    return response.data;
};

/**
 * Updates a user's data as an admin.
 *
 * @param userId - The ID of the user to update.
 * @param data - The data to update the user with.
 * @returns A promise that resolves to an array of IUser objects (updated list).
 */
export const updateUserByAdminApi =
    async (userId: string, data: IUpdateUserByAdmin): Promise<IUser[]> => {
    const response = await axiosInstance.put<IUser[]>(`/users/${userId}`, data);
    return response.data;
};