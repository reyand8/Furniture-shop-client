import React, {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Button, Typography} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';


import { handleAuthError } from '../../../common/utils/errorHandler/authErrorHandler';
import { updateProfileSchema } from '../../../common/utils/validation/profileValidation';
import { IProfileInfoProps, IUpdateUser } from '../../../types/user.interface';
import { IApiError } from '../../../types/error.interface';
import { AppDispatch } from '../../../store/store';
import {
    clearUpdateSuccess, deleteProfileRequest,
    selectUser, updateProfileRequest
} from '../../../store/slice/user/user.slice';
import UserFormInput from '../../user-form-input';
import { TextFieldBox } from '../../../styles/Auth.styles';
import {
    DeleteProfileBtn,
    ProfileInfoLabel,
    ProfileTitle
} from '../../../styles/Profile.styles';
import theme from '../../../assets/theme';
import ModalConfirmDelete from '../../modal-confirm-delete';


const ProfileInfo: React.FC<IProfileInfoProps> = ({user}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const { updateError, updateSuccess } = useSelector(selectUser);

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

    const defaultValues = useMemo(() => ({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    }), [user]);

    const {
        register: formUpdate,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUpdateUser>({
        resolver: yupResolver(updateProfileSchema),
        defaultValues,
    });

    useEffect((): void => {
        if (user) reset(defaultValues);
    }, [user, reset, defaultValues]);

    const handleDeleteClick = (): void => {
        setModalDeleteOpen(true);
    };

    useEffect(() => {
        if (modalDeleteConfirm) {
            dispatch(deleteProfileRequest());
            setModalDeleteConfirm(false);
            setModalDeleteOpen(false);
        }
    }, [modalDeleteConfirm, dispatch, navigate]);

    const onSubmit: SubmitHandler<IUpdateUser> = (data: IUpdateUser): void => {
        setSubmitError(null);
        dispatch(updateProfileRequest(data));
    };

    return (
        <Box>
            <ProfileTitle>Profile</ProfileTitle>
            <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                <ProfileInfoLabel>First Name</ProfileInfoLabel>
                <UserFormInput
                    label=""
                    type="text"
                    registration={formUpdate('firstName')}
                    error={errors.firstName}
                />
                <ProfileInfoLabel>Last Name</ProfileInfoLabel>
                <UserFormInput
                    label=""
                    type="text"
                    registration={formUpdate('lastName')}
                    error={errors.lastName}
                />
                <ProfileInfoLabel>Email</ProfileInfoLabel>
                <UserFormInput
                    label=""
                    type="email"
                    registration={formUpdate('email')}
                    error={errors.email}
                />
                { submitError && (
                    <Typography color="error" variant="body2">
                        {submitError}
                    </Typography>
                )}
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