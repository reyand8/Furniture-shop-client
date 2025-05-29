import React, { useEffect, useMemo, useState } from 'react';
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
import { updateUserByAdminSchema } from '../../../../common/utils/validation/profileValidation';
import { handleAuthError } from '../../../../common/utils/error-handler/authErrorHandler';
import { ProfileInfoLabel } from '../../../../styles/Profile.styles';
import UserFormCheckbox from '../../../user-form/user-form-checkbox';
import UserFormSelect from '../../../user-form/user-form-select';
import { AppDispatch } from '../../../../store/store';
import { IApiError } from '../../../../types/error.interface';
import {
    clearUpdateByAdminSuccess,
    selectAdmin,
    updateUserByAdminRequest,
} from '../../../../store/slice/admin/admin.slice';
import { IUpdateUserByAdmin, Role } from '../../../../types/admin.interface';
import { IUserDetailsProps } from '../../../../types/props.interface';
import { DialogFormBtns } from '../../../../styles/DialogDetails.styles';


const UserEdit: React.FC<IUserDetailsProps> = ({ item, isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {updateUserError, updateUserSuccess } = useSelector(selectAdmin);

    useEffect((): void => {
        if (updateUserError) {
            handleAuthError(updateUserError, setSubmitError);
        }
    }, [updateUserError]);

    useEffect((): void => {
        if (updateUserSuccess) {
            dispatch(clearUpdateByAdminSuccess());
            handleClose();
        }
    }, [updateUserSuccess, dispatch]);

    const methods = useForm({
        resolver: yupResolver(updateUserByAdminSchema),
        defaultValues: {
            role: item.role as Role,
            isActive: item.isActive
        },
    });

    const handleClose = (): void => {
        setSubmitError(null);
        setShowSuccessMessage(false);
        dispatch(clearUpdateByAdminSuccess());
        setIsOpen(false);
    };

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (isOpen) {
            reset({
                role: item.role as 'ADMIN' | 'USER',
                isActive: item.isActive,
            });
        }
    }, [isOpen, item, reset]);

    const onSubmit: SubmitHandler<IUpdateUserByAdmin> = (data: IUpdateUserByAdmin): void => {
        setSubmitError(null);
        dispatch(updateUserByAdminRequest({ userId: item.id, data }));
    };

    const roleOptions = useMemo(() => [
        { value: 'USER', label: 'User' },
        { value: 'ADMIN', label: 'Admin' },
    ], []);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Edit User Info</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                        <ProfileInfoLabel>Status</ProfileInfoLabel>
                        <UserFormCheckbox
                            name="isActive"
                            label="Active"
                        />
                        <ProfileInfoLabel>Role</ProfileInfoLabel>
                        <UserFormSelect
                            name="role"
                            label="Role"
                            options={roleOptions}
                        />
                        {submitError && <SubmitError submitError={submitError} />}
                        { showSuccessMessage && (
                            <Typography color="success.main" variant="body2">
                                User info was updated successfully.
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
            </DialogContent>
        </Dialog>
    );
};

export default UserEdit;