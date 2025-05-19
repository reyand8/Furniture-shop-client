export interface IContactInfo {
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    region: string;
    country: string;
    companyName?: string | null;
    companyTaxId?: string | null;
}

export interface IContactInfoResponse {
    contactInfo: IAllContactInfo[];
    totalPages: number;
}

export interface IAllContactInfo {
    id: string,
    createdAt: string,
    updatedAt: string,
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    region: string;
    country: string;
    companyName: string | null;
    companyTaxId: string | null;
}

export interface IUpdateContactInfo {
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    region: string;
    country: string;
    companyName?: string | null;
    companyTaxId?: string | null;
}

export interface IContactInfoState {
    contactInfo: IAllContactInfo[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
    deleteSuccess: boolean;
    success: boolean;
}