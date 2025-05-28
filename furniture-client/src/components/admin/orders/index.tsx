import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Typography, List, ListItem,
} from '@mui/material';

import { fetchOrdersByAdminRequest, selectOrder } from '../../../store/slice/order/order.slice';
import {IExistedOrder, IOrdersGroupedByStatus} from '../../../types/order.interface';
import theme from '../../../assets/theme';
import Loading from '../../status/loading';
import ErrorInfo from '../../status/error';
import {
    OrderInfoAdminItemsSection,
    OrderInfoAdminSection,
    OrderListItemButton
} from '../../../styles/Order.styles';
import OrderItem from './order-item';


const Orders: React.FC = () => {
    const dispatch = useDispatch();
    const { allAdminOrders, loading, error } = useSelector(selectOrder);

    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    useEffect((): void => {
        dispatch(fetchOrdersByAdminRequest());
    }, [dispatch]);

    const handleStatusClick = (status: string): void => {
        setSelectedStatus(status);
    };

    const allOrders: IOrdersGroupedByStatus = Array.isArray(allAdminOrders) ? {} : allAdminOrders;

    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;

    return  (
        <OrderInfoAdminSection>
            <List sx={{p: 3}}>
                {Object.entries(allOrders).map(([status, orders]) => (
                    <ListItem key={status}>
                        <OrderListItemButton
                            selected={selectedStatus === status}
                            disabled={orders.length <= 0}
                            onClick={(): void => handleStatusClick(status)}>
                            <Typography variant="body1" fontWeight="bold">
                                {status} ({orders.length})
                            </Typography>
                        </OrderListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box flex={1}>
                {selectedStatus && allOrders[selectedStatus] ? (
                    <>
                        <Typography variant="h5" sx={{color: theme.palette.text.secondary, pb:4 }}>
                            Orders with status: {selectedStatus}
                        </Typography>
                        <OrderInfoAdminItemsSection>
                            {allOrders[selectedStatus].map((order: IExistedOrder) => (
                                <OrderItem key={order.id} item={order}/>
                            ))}
                        </OrderInfoAdminItemsSection>
                    </>
                ) : (
                    <Typography variant="body1" color="text.secondary">
                        Select a status to view orders.
                    </Typography>
                )}
            </Box>
        </OrderInfoAdminSection>
    );
};

export default Orders;
