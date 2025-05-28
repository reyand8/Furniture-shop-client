import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { IApiError } from '../../../types/error.interface';
import { ProductType } from '../../../types/catalog.interface';
import { fetchCategoriesRequest, selectCatalog } from '../../../store/slice/catalog/catalog.slice';
import { AppDispatch } from '../../../store/store';
import { handleAuthError } from '../error-handler/authErrorHandler';
import { clearSuccess } from '../../../store/slice/order/order.slice';


export const useProductForm = (schema: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError | null>(null);

    const { categories } = useSelector(selectCatalog);

    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { setValue, reset } = methods;

    useEffect(() => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    const productTypeOptions = useMemo(() =>
        Object.values(ProductType).map(type => ({
            value: type,
            label: type.charAt(0) + type.slice(1).toLowerCase(),
        })), []);

    const categoryOptions = useMemo(() =>
        categories?.map(cat => ({
            value: cat.id,
            label: cat.name,
        })) || [], [categories]);

    const handleError = (error: IApiError | null) => {
        if (error) {
            handleAuthError(error, setSubmitError);
        }
    };

    const handleClose = () => {
        setSubmitError(null);
        dispatch(clearSuccess());
        reset();
    };

    return {
        methods,
        setValue,
        reset,
        productTypeOptions,
        categoryOptions,
        submitError,
        setSubmitError,
        handleError,
        handleClose
    };
};
