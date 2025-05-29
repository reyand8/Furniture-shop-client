import React, { useEffect } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import { FormProvider, SubmitHandler } from 'react-hook-form';

import theme from '../../../../assets/theme';
import { TextFieldBox } from '../../../../styles/Auth.styles';
import { AppDispatch } from '../../../../store/store';
import { IProductEditProps } from '../../../../types/props.interface';
import { clearSuccess, updateProductRequest } from '../../../../store/slice/catalog/catalog.slice';
import { productUpdateSchema } from '../../../../common/utils/validation/catalogValidation';
import { ProductType } from '../../../../types/catalog.interface';
import Loading from '../../../status/loading';
import ProductFormFields from '../../../user-form/product-form-fields';
import { useSelector, useDispatch } from 'react-redux';
import { selectCatalog } from '../../../../store/slice/catalog/catalog.slice';
import { useProductForm } from '../../../../common/utils/products/useProductForm';


const ProductEdit: React.FC<IProductEditProps> = ({ item, isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        methods,
        reset,
        submitError,
        setSubmitError,
        handleError,
        handleClose,
        productTypeOptions,
        categoryOptions
    } = useProductForm(productUpdateSchema);

    const { errorUpdateProduct, successUpdateProduct, loadingUpdateProduct } = useSelector(selectCatalog);
    const { handleSubmit } = methods;

    useEffect((): void => {
        handleError(errorUpdateProduct);
    }, [errorUpdateProduct]);

    useEffect((): void => {
        if (successUpdateProduct) {
            handleClose();
            clearSuccess()
            setIsOpen(false);
        }
    }, [successUpdateProduct, handleClose, setIsOpen]);

    useEffect((): void => {
        if (isOpen && item) {
            reset({
                name: item.name,
                description: item.description,
                price: item.price,
                discountPrice: item.discountPrice ?? null,
                currency: item.currency,
                type: item.type as ProductType,
                size: item.size,
                color: item.color ?? null,
                isBestSeller: item.isBestSeller,
                isAvailable: item.isAvailable,
                isActive: item.isActive,
                categoryId: item.category.id,
                images: item.images || [],
            });
        }
    }, [isOpen, item, reset]);

    const onSubmit: SubmitHandler<any> = (data): void => {
        setSubmitError(null);
        dispatch(updateProductRequest({ id: item.id, data }));
    };

    if (loadingUpdateProduct) return <Loading />;

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Edit Product</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
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
                            sx={{ mb: 1 }}
                        >
                            Update
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose();
                                setIsOpen(false);
                            }}
                            color="secondary"
                            variant="outlined"
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </TextFieldBox>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default ProductEdit;
