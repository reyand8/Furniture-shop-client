import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { AppDispatch } from '../../store/store';
import { clearProfileError, fetchProfileRequest, selectUser } from '../../store/slice/user/user.slice';
import { PATHS } from '../../routes/paths';
import { logout } from '../../store/slice/authUser/authUser.slice';
import OrderSelectContact from '../../components/order-create/order-select-contact';
import Header from '../../components/header';
import Footer from '../../components/footer';
import OrderItems from '../../components/order-create/order-items';
import OrderPaymentMethod from '../../components/order-create/order-payment-method';
import OrderNotes from '../../components/order-create/order-notes';
import OrderAdd from '../../components/order-create/order-add';
import { HeaderBox } from '../../styles/Header.styles';
import {
    CreateOrderItemsSection,
    CreateOrderMainSection,
    CreateOrderTitle
} from '../../styles/Order.styles';
import Loading from '../../components/status/loading';
import Empty from '../../components/status/empty';
import { ACCESS_TOKEN_KEY } from '../../common/common-items';


const OrderCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector(selectUser);
    const token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

    useEffect((): void => {
        if (!token && !error) {
            navigate(PATHS.LOGIN);
            return;
        }
        if (!loading && !user && !error) {
            dispatch(fetchProfileRequest());
        }
    }, [dispatch, navigate, token, error, loading, user]);

    useEffect((): void => {
        if (error) {
            dispatch(logout());
            dispatch(clearProfileError());
        }
    }, [error, dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Empty />;
    }

    if (!user) {
        navigate(PATHS.LOGIN);
    }

    return (
        <>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <CreateOrderMainSection>
                <CreateOrderTitle>Create Order</CreateOrderTitle>
                <CreateOrderItemsSection >
                    <OrderItems />
                    <Box sx={{maxWidth: '480px', width: '100%'}}>
                        <OrderSelectContact />
                        <OrderPaymentMethod />
                        <OrderNotes />
                        <OrderAdd/>
                    </Box>
                </CreateOrderItemsSection>
            </CreateOrderMainSection>
            <Footer />
        </>
    );
};

export default OrderCreate;