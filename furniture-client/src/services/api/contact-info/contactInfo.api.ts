import axiosInstance from '../../instance/axiosInstance';
import {
    IAllContactInfo,
    IContactInfo,
    IContactInfoResponse,
    IUpdateContactInfo
} from '../../../types/contactInfo.interface';


/**
 * Retrieves a paginated list of contact information records.
 *
 * @param page - Current page number.
 * @param pageSize - Number of records per page.
 * @returns A promise that resolves to a paginated contact info response.
 */
export const getContactInfoApi =
    async (page: number, pageSize: number): Promise<IContactInfoResponse> => {
    const response =
        await axiosInstance.get<IContactInfoResponse>('/users/contact-info', {
        params: { page, pageSize },
    });
    return response.data;
};

/**
 * Creates a new contact information entry.
 *
 * @param data - Contact information data to create.
 * @returns A promise that resolves to the created contact information.
 */
export const createContactInfoApi =
    async (data: IContactInfo): Promise<IContactInfo> => {
    const response =
        await axiosInstance.post<IContactInfo>('/users/contact-info', data);
    return response.data;
};

/**
 * Updates existing contact information by ID.
 *
 * @param data - Updated contact information data.
 * @param id - ID of the contact information to update.
 * @returns A promise that resolves to the updated contact information.
 */
export const updateContactInfoApi =
    async (data: IUpdateContactInfo, id: string): Promise<IAllContactInfo> => {
    const response =
        await axiosInstance.put<IAllContactInfo>(`/users/contact-info/${id}`, data);
    return response.data;
};

/**
 * Deletes a contact information entry by ID.
 *
 * @param id - ID of the contact information to delete.
 * @returns A promise that resolves to the ID of the deleted contact info.
 */
export const deleteContactInfoApi = async (id: string): Promise<string> => {
    await axiosInstance.delete<IContactInfo>(`/users/contact-info/${id}`);
    return id;
};

