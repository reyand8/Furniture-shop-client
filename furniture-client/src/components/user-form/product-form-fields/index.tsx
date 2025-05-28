import React from 'react';
import { Box } from '@mui/material';

import { IProductFormFieldsProps} from '../../../types/props.interface';
import { ProfileInfoLabel } from '../../../styles/Profile.styles';
import UserFormInput from '../user-form-input';
import UserFormSelect from '../user-form-select';
import UserFormImages from '../user-form-images';
import { ProductCreateCheckboxSection } from '../../../styles/Admin.styles';
import UserFormCheckbox from '../user-form-checkbox';
import SubmitError from '../../submit-error';


const ProductFormFields: React.FC<IProductFormFieldsProps> = ({ productTypeOptions, categoryOptions, submitError }) => (
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
        }}>
        <Box sx={{ flex: '1 1 50%' }}>
            <ProfileInfoLabel>Name</ProfileInfoLabel>
            <UserFormInput name="name" label="" />
            <ProfileInfoLabel>Description</ProfileInfoLabel>
            <UserFormInput name="description" label="" />
            <ProfileInfoLabel>Price</ProfileInfoLabel>
            <UserFormInput name="price" label="" type="number" />
            <ProfileInfoLabel>Discount Price</ProfileInfoLabel>
            <UserFormInput name="discountPrice" label="" type="number" />
            <ProfileInfoLabel>Currency</ProfileInfoLabel>
            <UserFormInput name="currency" label="" />
        </Box>
        <Box sx={{ flex: '1 1 50%' }}>
            <ProfileInfoLabel>Product Type</ProfileInfoLabel>
            <UserFormSelect name="type" label="" options={productTypeOptions} />
            <ProfileInfoLabel>Size</ProfileInfoLabel>
            <UserFormInput name="size" label="" />
            <ProfileInfoLabel>Color</ProfileInfoLabel>
            <UserFormInput name="color" label="" />
            <ProfileInfoLabel>Category</ProfileInfoLabel>
            <UserFormSelect name="categoryId" label="" options={categoryOptions} />
        </Box>
        <Box sx={{ flex: '1 1 100%' }}>
            <UserFormImages name="images" label="Product Images (URLs)" />
        </Box>
        <ProductCreateCheckboxSection sx={{ flex: '1 1 100%' }}>
            <UserFormCheckbox name="isAvailable" label="Available" />
            <UserFormCheckbox name="isActive" label="Active" />
        </ProductCreateCheckboxSection>
        {submitError && (
            <Box sx={{ flex: '1 1 100%' }}>
                <SubmitError submitError={submitError} />
            </Box>
        )}
    </Box>
);

export default ProductFormFields;
