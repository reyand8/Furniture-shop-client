import * as yup from 'yup';

import { VALIDATION_MESSAGES }  from '../messages/messages';
import { ProductType } from '../../../types/catalog.interface';


const {
    CATEGORY_NAME_REQUIRED,
    CATEGORY_STATUS_REQUIRED
} = VALIDATION_MESSAGES;

export const categorySchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required(CATEGORY_NAME_REQUIRED),
    isActive: yup
        .boolean()
        .required(CATEGORY_STATUS_REQUIRED),
});

const productBaseSchema = {
    name: yup
        .string()
        .trim()
        .max(100, 'Name must be at most 100 characters')
        .required('Product name is required'),

    description: yup
        .string()
        .trim()
        .max(500, 'Description must be at most 500 characters')
        .required('Product description is required'),

    price: yup
        .number()
        .typeError('Price must be a number')
        .min(0, 'Price must be at least 0')
        .required('Price is required'),

    discountPrice: yup
        .number()
        .typeError('Discount price must be a number')
        .min(0, 'Discount price must be at least 0')
        .nullable(),

    images: yup
        .array()
        .typeError('Images must be an array')
        .required('Images are required'),

    currency: yup
        .string()
        .trim()
        .max(20, 'Currency must be at most 20 characters')
        .required('Currency is required'),

    type: yup
        .mixed<ProductType>()
        .oneOf(Object.values(ProductType), 'Invalid product type')
        .required('Product type is required'),

    size: yup
        .string()
        .trim()
        .max(50, 'Size must be at most 50 characters')
        .required('Size is required'),

    color: yup
        .string()
        .trim()
        .max(50, 'Color must be at most 50 characters')
        .nullable(),

    isAvailable: yup
        .boolean()
        .required('Availability flag is required'),

    isActive: yup
        .boolean()
        .required('Active status is required'),

    categoryId: yup
        .string()
        .uuid('Category ID must be a valid UUID')
        .required('Category is required'),
};

export const productCreateSchema = yup.object().shape({
    ...productBaseSchema,
});

export const productUpdateSchema = yup.object().shape({
    ...productBaseSchema,
    isBestSeller: yup
        .boolean()
        .required('Best seller flag is required'),
});
