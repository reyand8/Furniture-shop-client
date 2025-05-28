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
import { handleAuthError } from '../../../../common/utils/error-handler/authErrorHandler';
import { ProfileInfoLabel } from '../../../../styles/Profile.styles';
import UserFormSelect from '../../../user-form/user-form-select';
import { AppDispatch } from '../../../../store/store';
import { IApiError } from '../../../../types/error.interface';
import { IOrderStatusEditProps } from '../../../../types/props.interface';
import { DialogFormBtns } from '../../../../styles/DialogDetails.styles';
import {
    clearSuccess,
    selectOrder,
    updateOrderStatusRequest
}  from '../../../../store/slice/order/order.slice';
import { orderStatusSchema } from '../../../../common/utils/validation/orderValidation';
import { EOrderStatus, IUpdateOrderStatusApi } from '../../../../types/order.interface';
import Loading from '../../../status/loading';


const OrderEdit: React.FC<IOrderStatusEditProps> = ({ item, isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [submitError, setSubmitError] = useState<IApiError>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {errorUpdateOrderStatus, successUpdateOrderStatus, loading } = useSelector(selectOrder);

    useEffect((): void => {
        if (errorUpdateOrderStatus) {
            handleAuthError(errorUpdateOrderStatus, setSubmitError);
        }
    }, [errorUpdateOrderStatus]);

    useEffect((): void => {
        if (successUpdateOrderStatus) {
            setShowSuccessMessage(false);
            dispatch(clearSuccess());
            handleClose();
        }
    }, [successUpdateOrderStatus, dispatch]);

    const methods = useForm({
        resolver: yupResolver(orderStatusSchema),
        defaultValues: {
            status: item.status as EOrderStatus,
        },
    });

    const handleClose = (): void => {
        setSubmitError(null);
        setShowSuccessMessage(false);
        setIsOpen(false);
    };

    const { handleSubmit, reset } = methods;

    useEffect((): void => {
        if (isOpen) {
            reset({
                status: item.status,
            });
        }
    }, [isOpen, item, reset]);

    const onSubmit: SubmitHandler<IUpdateOrderStatusApi> = (data): void => {
        setSubmitError(null);
        dispatch(updateOrderStatusRequest({ id: item.id, data }));
    };

    const statusOptions =
        useMemo(() =>
            Object.values(EOrderStatus).map(status => ({
        value: status,
        label: status,
    })), []);

    if (loading) return <Loading />;

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle color={theme.palette.text.secondary}>Edit Order Status</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <TextFieldBox onSubmit={handleSubmit(onSubmit)}>
                        <ProfileInfoLabel>Status Order</ProfileInfoLabel>
                        <UserFormSelect
                            name="status"
                            label="Status"
                            options={statusOptions}
                        />
                        {submitError && <SubmitError submitError={submitError} />}
                        { showSuccessMessage && (
                            <Typography color="success.main" variant="body2">
                                Order status was updated successfully.
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

export default OrderEdit;