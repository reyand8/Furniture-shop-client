import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button, Dialog, DialogContent,
    DialogTitle, Typography
} from '@mui/material';


import theme from '../../../../assets/theme';
import { TextFieldBox } from '../../../../styles/Auth.styles';
import SubmitError from '../../../submit-error';
import { handleAuthError } from '../../../../common/utils/error-handler/authErrorHandler';
import { ProfileInfoLabel } from '../../../../styles/Profile.styles';
import { AppDispatch } from '../../../../store/store';
import { IApiError } from '../../../../types/error.interface';
import { ICategoryEditProps } from '../../../../types/props.interface';
import { DialogFormBtns } from '../../../../styles/DialogDetails.styles';
import {
    clearSuccess,
    selectCatalog,
    updateCategoryRequest
} from '../../../../store/slice/catalog/catalog.slice';
import { ICreateUpdateCategory } from '../../../../types/catalog.interface';
import { categorySchema } from '../../../../common/utils/validation/catalogValidation';
import UserFormInput from '../../../user-form/user-form-input';
import UserFormCheckbox from '../../../user-form/user-form-checkbox';
import Loading from '../../../status/loading';


const CategoryEdit: React.FC<ICategoryEditProps> = ({ item, isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {
        errorUpdateCategory,
        successUpdateCategory,
        loadingUpdateCategory
    } = useSelector(selectCatalog);

    useEffect((): void => {
        if (errorUpdateCategory) {
            handleAuthError(errorUpdateCategory, setSubmitError);
        }
    }, [errorUpdateCategory]);

    useEffect(() => {
        if (successUpdateCategory) {
            setShowSuccessMessage(true);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                dispatch(clearSuccess());
                handleClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successUpdateCategory, dispatch]);

    const methods = useForm<ICreateUpdateCategory>({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            name: item.name,
            isActive: item.isActive,
        },
    });

    const handleClose = (): void => {
        setSubmitError(null);
        setShowSuccessMessage(false);
        dispatch(clearSuccess());
        setIsOpen(false);
    };

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (isOpen && item) {
            reset({
                name: item.name,
                isActive: item.isActive,
            });
        }
    }, [item, isOpen, reset]);

    const onSubmit: SubmitHandler<ICreateUpdateCategory> = (data: ICreateUpdateCategory): void => {
        setSubmitError(null);
        dispatch(updateCategoryRequest({ data, id: item.id }));
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Edit Category</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                        <ProfileInfoLabel>Name</ProfileInfoLabel>
                        <UserFormInput
                            name="name"
                            label=""
                        />
                        <ProfileInfoLabel>Status</ProfileInfoLabel>
                        <UserFormCheckbox
                            name="isActive"
                            label="Active"
                        />
                        {submitError && <SubmitError submitError={submitError} />}
                        {showSuccessMessage && (
                            <Typography color="success.main" variant="body2">
                                Category was updated successfully.
                            </Typography>
                        )}
                        <DialogFormBtns>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                fullWidth>
                                Update
                            </Button>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                variant="outlined"
                                fullWidth>
                                Cancel
                            </Button>
                        </DialogFormBtns>
                    </TextFieldBox>
                </FormProvider>
                {
                    loadingUpdateCategory && <Loading />
                }
            </DialogContent>
        </Dialog>
    );
};

export default CategoryEdit;
