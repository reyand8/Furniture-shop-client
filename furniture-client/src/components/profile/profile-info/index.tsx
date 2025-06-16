import React, {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Button, Typography} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';


import { handleAuthError } from '../../../common/utils/error-handler/authErrorHandler';
import { updateProfileSchema } from '../../../common/utils/validation/profileValidation';
import { IUpdateUser } from '../../../types/user.interface';
import { IApiError } from '../../../types/error.interface';
import { AppDispatch } from '../../../store/store';
import {
    clearUpdateSuccess, deleteProfileRequest,
    selectUser, updateProfileRequest
} from '../../../store/slice/user/user.slice';
import UserFormInput from '../../user-form/user-form-input';
import { TextFieldBox } from '../../../styles/Auth.styles';
import {
    DeleteProfileBtn,
    ProfileInfoLabel,
    ProfileTitle
} from '../../../styles/Profile.styles';
import theme from '../../../assets/theme';
import ModalConfirmDelete from '../../modal-confirm-delete';
import SubmitError from '../../submit-error';


/**
 * ProfileInfo component displays and allows editing
 * of the user's profile information (first name, last name, email).
 *
 * - Initializes the form with current user data.
 * - Uses react-hook-form with yup for validation.
 * - Dispatches profile update requests to Redux store.
 * - Handles API errors and shows success messages.
 * - Allows profile deletion with confirmation modal.
 */
const ProfileInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, updateError, updateSuccess } = useSelector(selectUser);

    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    /**
     * Effect: handle API errors and success updates.
     * Shows error messages on failure and success message on update.
     * Automatically clears success message after 4 seconds.
     */
    useEffect(() => {
        if (updateError) {
            handleAuthError(updateError, setSubmitError);
        }
        if (updateSuccess) {
            setShowSuccessMessage(true);
            const timer = setTimeout((): void => {
                setShowSuccessMessage(false);
                dispatch(clearUpdateSuccess());
            }, 4000);
            return (): void => clearTimeout(timer);
        }
    }, [updateError, updateSuccess, dispatch]);

    /**
     * Memoize default form values based on current user data
     */
    const defaultValues = useMemo(() => ({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    }), [user]);

    /**
     * Initialize react-hook-form with yup validation schema and default values.
     */
    const methods = useForm<IUpdateUser>({
        resolver: yupResolver(updateProfileSchema),
        defaultValues,
    });

    const { handleSubmit, reset } = methods;

    /**
     * Reset form values when user data or defaults change.
     */
    useEffect((): void => {
        if (user) reset(defaultValues);
    }, [user, reset, defaultValues]);

    /**
     * Opens the modal to confirm profile deletion.
     */
    const handleDeleteClick = (): void => {
        setModalDeleteOpen(true);
    };

    /**
     * Effect: if deletion is confirmed, dispatch delete request.
     * Close the modal and reset confirmation state afterwards.
     */
    useEffect(() => {
        if (modalDeleteConfirm) {
            dispatch(deleteProfileRequest());
            setModalDeleteConfirm(false);
            setModalDeleteOpen(false);
        }
    }, [modalDeleteConfirm, dispatch, navigate]);

    /**
     * Form submit handler to dispatch profile update.
     * Clears any previous submit errors before dispatching.
     */
    const onSubmit: SubmitHandler<IUpdateUser> = (data: IUpdateUser): void => {
        setSubmitError(null);
        dispatch(updateProfileRequest(data));
    };

    return (
        <Box>
            <ProfileTitle>Profile</ProfileTitle>
            <FormProvider {...methods}>
                <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                    <ProfileInfoLabel>First Name</ProfileInfoLabel>
                    <UserFormInput name="firstName" label="" />
                    <ProfileInfoLabel>Last Name</ProfileInfoLabel>
                    <UserFormInput name="lastName" label="" />
                    <ProfileInfoLabel>Email</ProfileInfoLabel>
                    <UserFormInput type="email" name="email" label="" />
                    {submitError && <SubmitError submitError={submitError} />}
                    { showSuccessMessage && (
                        <Typography color="success.main" variant="body2">
                            Your profile was updated successfully.
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ margin: '14px 0 38px 0' }}
                        fullWidth>
                        Update
                    </Button>
                </TextFieldBox>
            </FormProvider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DeleteProfileBtn onClick={handleDeleteClick}>
                    <Typography color={theme.palette.error.dark}>Delete Profile</Typography>
                </DeleteProfileBtn>
            </Box>
            {modalDeleteOpen && (
                <ModalConfirmDelete
                    message="Are you sure you want to delete your profile?"
                    setModalConfirm={setModalDeleteConfirm}
                    setModalOpen={setModalDeleteOpen}
                />
            )}
        </Box>
    )
}

export default ProfileInfo;