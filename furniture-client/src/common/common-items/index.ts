import { IContactFields } from '../../types/common.interface';


export const PAGE_SIZE: number = 4;

export const contactFieldsFirstColumn: IContactFields[] = [
    { name: 'phone', label: 'Phone' },
    { name: 'address', label: 'Address' },
    { name: 'zipCode', label: 'Zip Code' },
    { name: 'city', label: 'City' },
];

export const contactFieldsSecondColumn: IContactFields[] = [
    { name: 'region', label: 'Region' },
    { name: 'country', label: 'Country' },
    { name: 'companyName', label: 'Company Name' },
    { name: 'companyTaxId', label: 'Company Tax Id' },
];
