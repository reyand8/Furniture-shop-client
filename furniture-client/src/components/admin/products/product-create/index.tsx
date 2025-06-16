import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { TextFieldBox } from '../../../../styles/Auth.styles';
import Loading from '../../../status/loading';
import ProductFormFields from '../../../user-form/product-form-fields';

import { AppDispatch } from '../../../../store/store';
import { createProductRequest, selectCatalog } from '../../../../store/slice/catalog/catalog.slice';
import { productCreateSchema } from '../../../../common/utils/validation/catalogValidation';
import { useProductForm } from '../../../../common/utils/products/useProductForm';
import { ICreateProduct } from "../../../../types/catalog.interface";

/**
 * ProductCreate component handles the creation of new products.
 * It provides a form with validation, submits data to the store,
 * and manages UI states like loading, success, and errors.
 */
const ProductCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        methods,
        reset,
        setValue,
        productTypeOptions,
        categoryOptions,
        submitError,
        setSubmitError,
        handleError,
        handleClose
    } = useProductForm(productCreateSchema);

    const { handleSubmit } = methods;

    const {
        categories,
        errorCreateProduct,
        successCreateProduct,
        loadingCreateProduct,
    } = useSelector(selectCatalog);

    /**
     * Set default category when categories are loaded
     */
    useEffect(() => {
        if (categories.length > 0) {
            setValue('categoryId', categories[0].id);
        }
    }, [categories, setValue]);

    /**
     * Reset form and close modal on successful product creation
     */
    useEffect(() => {
        if (successCreateProduct) {
            handleClose();
            reset();
        }
    }, [successCreateProduct]);

    /**
     * Handle errors during product creation
     */
    useEffect(() => {
        handleError(errorCreateProduct);
    }, [errorCreateProduct]);

    /**
     * Handle form submit event
     * @param {ICreateProduct} data - The product data submitted by the form
     */
    const onSubmit: SubmitHandler<any> = (data) => {
        setSubmitError(null);
        dispatch(createProductRequest(data));
    };

    if (loadingCreateProduct) return <Loading />;

    return (
        <Box sx={{ mt: 2 }}>
            <FormProvider {...methods}>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <ProductFormFields
                            productTypeOptions={productTypeOptions}
                            categoryOptions={categoryOptions}
                            submitError={submitError}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                            sx={{ flex: '1 1 100%', mb: 1 }}>
                            Create product
                        </Button>
                    </Box>
                </TextFieldBox>
            </FormProvider>
        </Box>
    );
};

export default ProductCreate;
