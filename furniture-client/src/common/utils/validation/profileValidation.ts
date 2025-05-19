import * as yup from 'yup';

import { VALIDATION_MESSAGES }  from '../messages/messages';


const {
    FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED, EMAIL_REQUIRED, EMAIL_INVALID,
    FIRST_NAME_TOO_LONG, LAST_NAME_TOO_LONG, EMAIL_TOO_LONG, FIRST_NAME_INVALID,
    LAST_NAME_INVALID,
} = VALIDATION_MESSAGES;

const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;

export const updateProfileSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required(FIRST_NAME_REQUIRED)
        .max(60, FIRST_NAME_TOO_LONG)
        .matches(namePattern, FIRST_NAME_INVALID),
    lastName: yup
        .string()
        .trim()
        .required(LAST_NAME_REQUIRED)
        .max(60, LAST_NAME_TOO_LONG)
        .matches(namePattern, LAST_NAME_INVALID),
    email: yup
        .string()
        .trim()
        .required(EMAIL_REQUIRED)
        .email(EMAIL_INVALID)
        .max(60, EMAIL_TOO_LONG),
});