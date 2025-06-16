import axiosInstance from '../../instance/axiosInstance';

import { IUpdateUser, IUser } from '../../../types/user.interface';

/**
 * Fetches the profile data of the currently authenticated user.
 *
 * @returns A promise that resolves to the user profile.
 */
export const getProfile = async (): Promise<IUser> => {
    const response = await axiosInstance.get<IUser>('/users/me');
    return response.data;
};

/**
 * Updates the profile of the currently authenticated user.
 *
 * @param data - The updated user profile data.
 * @returns A promise that resolves to the updated user profile.
 */
export const updateProfile = async (data: IUpdateUser): Promise<IUser> => {
    const response = await axiosInstance.put<IUser>('/users/me', data);
    return response.data;
};

/**
 * Deactivates the currently authenticated user's profile.
 *
 * @returns A promise that resolves to the updated (deactivated) user profile.
 */
export const deleteProfile = async (): Promise<IUser> => {
    const response =
        await axiosInstance.put<IUser>('/users/me', {isActive: false});
    return response.data;
};