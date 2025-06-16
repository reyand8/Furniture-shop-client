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


/**
 * UserEdit component allows admin to edit user role and status via a dialog form.
 *
 * @param {IUserDetailsProps} props - Component props
 * @param {object} props.item - The user object containing current user details.
 * @param {boolean} props.isOpen - Boolean controlling whether the dialog is open.
 * @param {function} props.setIsOpen - Function to toggle the dialog visibility.
 */
const UserEdit: React.FC<IUserDetailsProps> = ({ item, isOpen, setIsOpen }: IUserDetailsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {updateUserError, updateUserSuccess } = useSelector(selectAdmin);

    /**
     * Effect hook to handle update error by showing an error message.
     */
    useEffect((): void => {
        if (updateUserError) {
            handleAuthError(updateUserError, setSubmitError);
        }
    }, [updateUserError]);

    /**
     * Effect hook to handle successful user update by clearing success state and closing dialog.
     */
    useEffect((): void => {
        if (updateUserSuccess) {
            dispatch(clearUpdateByAdminSuccess());
            handleClose();
        }
    }, [updateUserSuccess, dispatch]);

    /**
     * React Hook Form instance with validation schema and default values from the user item.
     */
    const methods = useForm({
        resolver: yupResolver(updateUserByAdminSchema),
        defaultValues: {
            role: item.role as Role,
            isActive: item.isActive
        },
    });

    /**
     * Closes the dialog and resets error and success states.
     */
    const handleClose = (): void => {
        setSubmitError(null);
        setShowSuccessMessage(false);
        dispatch(clearUpdateByAdminSuccess());
        setIsOpen(false);
    };

    const { handleSubmit, reset } = methods;

    /**
     * Resets form values when dialog opens or user item changes.
     */
    useEffect((): void => {
        if (isOpen) {
            reset({
                role: item.role as 'ADMIN' | 'USER',
                isActive: item.isActive,
            });
        }
    }, [isOpen, item, reset]);

    /**
     * Handles form submission to update user details.
     *
     * @param {IUpdateUserByAdmin} data - Form data with updated user info.
     */
    const onSubmit: SubmitHandler<IUpdateUserByAdmin> = (data: IUpdateUserByAdmin): void => {
        setSubmitError(null);
        dispatch(updateUserByAdminRequest({ userId: item.id, data }));
    };

    /**
     * Options for the user role select input.
     */
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