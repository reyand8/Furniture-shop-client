import * as yup from 'yup';

import { VALIDATION_MESSAGES }  from '../messages/messages';


const {
    PHONE_REQUIRED, PHONE_INVALID, ADDRESS_REQUIRED,
    ADDRESS_TOO_LONG, ZIP_CODE_REQUIRED, ZIP_CODE_TOO_LONG,
    CITY_REQUIRED, CITY_TOO_LONG, REGION_REQUIRED,
    REGION_TOO_LONG, COUNTRY_REQUIRED, COMPANY_NAME_TOO_LONG,
    COMPANY_TAX_ID_TOO_LONG,
} = VALIDATION_MESSAGES;

export const contactInfoSchema = yup.object().shape({
    phone: yup.string()
        .required(PHONE_REQUIRED)
        .matches(/^\+?\d{9,13}$/, PHONE_INVALID),
    address: yup.string()
        .max(200, ADDRESS_TOO_LONG)
        .required(ADDRESS_REQUIRED),
    zipCode: yup.string()
        .max(30, ZIP_CODE_TOO_LONG)
        .required(ZIP_CODE_REQUIRED),
    city: yup.string()
        .max(100, CITY_TOO_LONG)
        .required(CITY_REQUIRED),
    region: yup.string()
        .max(100, REGION_TOO_LONG)
        .required(REGION_REQUIRED),
    country: yup.string()
        .required(COUNTRY_REQUIRED),
    companyName: yup.string()
        .max(100, COMPANY_NAME_TOO_LONG)
        .notRequired(),
    companyTaxId: yup.string()
        .max(40, COMPANY_TAX_ID_TOO_LONG)
        .notRequired(),
});