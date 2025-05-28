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

    useEffect(() => {
        if (categories.length > 0) {
            setValue('categoryId', categories[0].id);
        }
    }, [categories, setValue]);

    useEffect(() => {
        if (successCreateProduct) {
            handleClose();
            reset();
        }
    }, [successCreateProduct]);

    useEffect(() => {
        handleError(errorCreateProduct);
    }, [errorCreateProduct]);

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
                            Update
                        </Button>
                    </Box>
                </TextFieldBox>
            </FormProvider>
        </Box>
    );
};

export default ProductCreate;
