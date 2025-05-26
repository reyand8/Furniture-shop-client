import { IContactFields } from '../../types/common.interface';
import { EUserRole } from '../../types/admin.interface';
import { EPaymentMethod } from '../../types/order.interface';
import theme from '../../assets/theme';


export const PAGE_SIZE: number = 4;

export const PAGE_SIZE_CATALOG: number = 6;
export const DEFAULT_MIN_FILTER = 0;
export const DEFAULT_MAX_FILTER = 2000;
export const DEFAULT_RANGE_FILTER: [number, number] = [DEFAULT_MIN_FILTER, DEFAULT_MAX_FILTER];

export const BASKET_KEY = 'basket';
export const ACCESS_TOKEN_KEY = 'accessToken';

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

export const roleLabels: Record<EUserRole, string> = {
    [EUserRole.SUPER_ADMIN]: 'Super admins',
    [EUserRole.ADMIN]: 'Admins',
    [EUserRole.USER]: 'Users'
};

export const paymentLabels: Record<EPaymentMethod, string> = {
    [EPaymentMethod.CREDIT_CARD]: 'Credit Card',
    [EPaymentMethod.CASH_ON_DELIVERY]: 'Cash on Delivery',
    [EPaymentMethod.PAYPAL]: 'PayPal',
};

export const iconAddForm = {
    color: theme.palette.primary.contrastText,
    fontSize: '48px'
};