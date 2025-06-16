import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { fetchOrdersRequest, selectOrder } from '../../../store/slice/order/order.slice';
import { OrderAllItemsBox } from '../../../styles/Order.styles';
import { IExistedOrder } from '../../../types/order.interface';
import { AppDispatch } from '../../../store/store';
import Empty from '../../status/empty';
import OrderItem from '../order-item';
import Loading from '../../status/loading';
import ErrorInfo from '../../status/error';


/**
 * OrderList component fetches and displays a list of existing orders.
 *
 * - Dispatches `fetchOrdersRequest` to retrieve orders on mount
 * - Shows loading, error, or empty state based on Redux state
 * - Maps and renders `OrderItem` for each order
 */
const OrderList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allExistedOrders, loading, error } = useSelector(selectOrder)

    /**
     * Fetch all orders when the component is first mounted.
     */
    useEffect((): void => {
        dispatch(fetchOrdersRequest());
    }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;
    if (allExistedOrders.length === 0) return <Empty />;

    return (
        <Box>
            <OrderAllItemsBox>
                {allExistedOrders.map((item: IExistedOrder) => (
                    <OrderItem item={item} key={item.id} />
                ))}
            </OrderAllItemsBox>
        </Box>
    )
}

export default OrderList;