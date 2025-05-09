import { VALIDATION_MESSAGES } from '../messages/messages';
import { IRegister } from '../../../features/types/user.interface';


const {
    FIRST_NAME_REQUIRED, LAST_NAME_REQUIRED,
    EMAIL_REQUIRED, PASSWORD_REQUIRED, FIRST_NAME_TOO_LONG,
    LAST_NAME_TOO_LONG, EMAIL_TOO_LONG, PASSWORD_TOO_SHORT,
    PASSWORD_TOO_LONG, EMAIL_INVALID,
} = VALIDATION_MESSAGES;

export const validateFirstName = (firstName: string): string => {
    if (!firstName) return FIRST_NAME_REQUIRED;
    const trimmed = firstName.trim();
    if (trimmed.length === 0) return FIRST_NAME_REQUIRED;
    if (trimmed.length > 60) return FIRST_NAME_TOO_LONG;
    return '';
};

export const validateLastName = (lastName: string): string => {
    if (!lastName) return LAST_NAME_REQUIRED;
    const trimmed = lastName.trim();
    if (trimmed.length === 0) return LAST_NAME_REQUIRED;
    if (trimmed.length > 60) return LAST_NAME_TOO_LONG;
    return '';
};

export const validateEmail = (email: string): string => {
    if (!email) return EMAIL_REQUIRED;
    const trimmed = email.trim();
    if (trimmed.length === 0) return EMAIL_REQUIRED;
    if (trimmed.length > 60) return EMAIL_TOO_LONG;
    if (!trimmed.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)) {
        return EMAIL_INVALID;
    }
    return '';
};

export const validatePassword = (password: string): string => {
    if (!password) return PASSWORD_REQUIRED;
    const trimmed = password.trim();
    if (trimmed.length === 0) return PASSWORD_REQUIRED;
    if (trimmed.length < 6) return PASSWORD_TOO_SHORT;
    if (trimmed.length > 30) return PASSWORD_TOO_LONG;
    return '';
};

export const validateRegisterForm = ( formData: IRegister ): IRegister => {
    return {
        firstName: validateFirstName(formData.firstName),
        lastName: validateLastName(formData.lastName),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
    };
};
