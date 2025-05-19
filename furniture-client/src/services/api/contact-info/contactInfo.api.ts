import axiosInstance from '../../instance/axiosInstance';
import {
    IAllContactInfo,
    IContactInfo,
    IContactInfoResponse,
    IUpdateContactInfo
} from '../../../types/contactInfo.interface';


export const getContactInfoApi =
    async (page: number, pageSize: number): Promise<IContactInfoResponse> => {
    const response =
        await axiosInstance.get<IContactInfoResponse>('/users/contact-info', {
        params: { page, pageSize },
    });
    return response.data;
};

export const createContactInfoApi =
    async (data: IContactInfo): Promise<IContactInfo> => {
    const response =
        await axiosInstance.post<IContactInfo>('/users/contact-info', data);
    return response.data;
};

export const updateContactInfoApi =
    async (data: IUpdateContactInfo, id: string): Promise<IAllContactInfo> => {
    const response =
        await axiosInstance.put<IAllContactInfo>(`/users/contact-info/${id}`, data);
    return response.data;
};

export const deleteContactInfoApi = async (id: string): Promise<string> => {
    await axiosInstance.delete<IContactInfo>(`/users/contact-info/${id}`);
    return id;
};

