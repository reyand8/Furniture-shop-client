import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldBox } from '../../../../styles/Auth.styles';
import UserFormInput from '../../../user-form/user-form-input';
import SubmitError from '../../../submit-error';
import { AppDispatch } from '../../../../store/store';
import { IApiError } from '../../../../types/error.interface';

import { handleAuthError } from '../../../../common/utils/error-handler/authErrorHandler';
import { categorySchema } from '../../../../common/utils/validation/catalogValidation';
import {
    clearSuccessCreateCategory,
    createCategoryRequest,
    selectCatalog
} from '../../../../store/slice/catalog/catalog.slice';
import { ICreateUpdateCategory } from '../../../../types/catalog.interface';
import Loading from '../../../status/loading';


const CategoryCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {
        errorCreateCategory,
        successCreateCategory,
        loadingCreateCategory
    } = useSelector(selectCatalog);

    const methods = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            isActive: true,
        },
    });

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (errorCreateCategory) {
            handleAuthError(errorCreateCategory, setSubmitError);
        }
    }, [errorCreateCategory]);

    useEffect((): void => {
        if (successCreateCategory) {
            setShowSuccessMessage(true);
            reset();
            dispatch(clearSuccessCreateCategory());
        }
    }, [successCreateCategory, dispatch, reset]);

    const onSubmit = (data: ICreateUpdateCategory): void => {
        setSubmitError(null);
        dispatch(createCategoryRequest({data}));
    };

    return (
        <Box sx={{mt: 2}}>
            <FormProvider {...methods}>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <UserFormInput name="name" label="Name" />
                    {submitError && <SubmitError submitError={submitError} />}
                    { showSuccessMessage && (
                        <Typography color="success.main" variant="body2">
                            Category was created successfully.
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ margin: '14px 0 38px 0' }}
                        fullWidth>
                        Add Category
                    </Button>
                </TextFieldBox>
                { loadingCreateCategory && <Loading /> }
            </FormProvider>
        </Box>
    )
}

export default CategoryCreate;