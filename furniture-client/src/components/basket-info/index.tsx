import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Avatar, Box, IconButton, Stack, Typography
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppDispatch } from '../../store/store';
import { fetchProductsByIdsRequest, selectCatalog } from '../../store/slice/catalog/catalog.slice';
import { IBasketDetailedItem, IBasketItem } from '../../types/basket.interface';
import {
    BasketInfoBox, BasketInfoMainTitle, BasketItemName,
    BasketItemPaper, BasketItemPrice, BasketItemQtyBox,
    BasketItemsSection, BasketOrderBtn, BasketTotal, BasketTotalBox, StatusBox
} from '../../styles/Basket.styles';
import { PATHS } from '../../routes/paths';
import {
    loadBasketFromStorage,
    mergeProductsWithQuantities,
    saveBasketToStorage
} from '../../common/utils/basket/basket';
import Loading from '../status/loading';
import ErrorInfo from '../status/error';
import Empty from '../status/empty';
import noImg from '../../assets/img/noImg.png'


/**
 * Shopping basket component that displays items added by the user.
 *
 * Allows modifying item quantities, removing items, and proceeding to create an order.
 * Synchronizes basket state with localStorage and fetches full product data by IDs.
 */
const BasketInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { productsByIds, loading, error } = useSelector(selectCatalog);
    const [basket, setBasket] = useState<IBasketItem[]>([]);

    /**
     * Load basket items from localStorage on mount and dispatch product fetching by IDs.
     */
    useEffect((): void => {
        loadBasketFromStorage(dispatch, setBasket);
    }, [dispatch]);

    /**
     * Increment quantity of a basket item by ID.
     * Updates localStorage and local state.
     *
     * @param {string} id - Product ID
     */
    const handleIncrement = useCallback((id: string): void => {
        const updated: IBasketItem[] = basket.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        saveBasketToStorage(updated, setBasket);
    }, [basket]);

    /**
     * Decrement quantity of a basket item by ID (not below 1).
     *
     * @param {string} id - Product ID
     */
    const handleDecrement = useCallback((id: string): void => {
        const updated: IBasketItem[] = basket.map((item: IBasketItem ): IBasketItem =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        saveBasketToStorage(updated, setBasket);
    }, [basket]);

    /**
     * Remove a product from the basket by ID.
     * Updates both localStorage and Redux product data.
     *
     * @param {string} id - Product ID
     */
    const handleDelete = useCallback((id: string): void => {
        const updated: IBasketItem[] = basket.filter((item: IBasketItem): boolean => item.id !== id);
        saveBasketToStorage(updated, setBasket);
        const updatedIds: string[] = updated.map((item) => item.id);
        dispatch(fetchProductsByIdsRequest({ ids: updatedIds }));
    }, [basket, dispatch]);

    /**
     * Merges stored basket data with fetched product info (images, price, etc).
     * Filters out products with quantity 0.
     */
    const productsWithQuantity: IBasketDetailedItem[] = useMemo(() => {
        return mergeProductsWithQuantities(productsByIds, basket)
            .filter(product => product.quantity > 0);
    }, [productsByIds, basket]);

    /**
     * Calculates the total price of the basket.
     */
    const totalPrice: number = useMemo(() => {
        return productsWithQuantity.reduce(
            (acc, product) =>
                acc + product.price * product.quantity, 0);
    }, [productsWithQuantity]);

    /**
     * Navigate to the order creation page if the basket is not empty.
     */
    const handleCreateOrder = (): void => {
        if (productsWithQuantity.length > 0) {
            navigate(PATHS.CREATE_ORDER);
        }
    };

    return (
        <BasketInfoBox>
            <BasketInfoMainTitle>
                Shopping basket
            </BasketInfoMainTitle>
            {loading && !error && (
                <StatusBox>
                    <Loading />
                </StatusBox>
            )}
            {error && (
                <StatusBox>
                    <ErrorInfo />
                </StatusBox>
            )}
            {
                productsWithQuantity.length > 0 ? (
                    <>
                        <Typography color="textSecondary" variant="subtitle1">
                            You have {productsWithQuantity.length} item{productsWithQuantity.length !== 1 && 's'} in your basket
                        </Typography>
                        <BasketItemsSection>
                            <Stack spacing={2}>
                                {productsWithQuantity.map(
                                    ({ id, images, name, quantity, price, currency }: IBasketDetailedItem) => (
                                    <BasketItemPaper key={id} elevation={2}>
                                        <Avatar
                                            variant="rounded"
                                            src={images[0] || noImg}
                                            sx={{ width: 80, height: 80, mr: 2 }}
                                        />
                                        <Box flex={1}>
                                            <BasketItemName>
                                                {name}
                                            </BasketItemName>
                                        </Box>
                                        <BasketItemQtyBox flex={1}>
                                            <IconButton size="small" onClick={(): void => handleIncrement(id)}>
                                                <ArrowDropUpIcon />
                                            </IconButton>
                                            <Typography color="textSecondary" fontWeight="bold" mr={1}>
                                                {quantity}
                                            </Typography>
                                            <IconButton size="small" onClick={(): void => handleDecrement(id)}>
                                                <ArrowDropDownIcon />
                                            </IconButton>
                                        </BasketItemQtyBox>
                                        <BasketItemPrice>
                                            {(price * quantity).toFixed(2)} {currency}
                                        </BasketItemPrice>
                                        <IconButton onClick={() => handleDelete(id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </BasketItemPaper>
                                ))}
                            </Stack>
                        </BasketItemsSection>
                        <BasketTotalBox>
                            <Box sx={{display: 'flex'}}>
                                <BasketTotal>
                                    Total: {totalPrice.toFixed(2)} {productsWithQuantity[0]?.currency || ''}
                                </BasketTotal>
                            </Box>
                            <BasketOrderBtn
                                onClick={handleCreateOrder}
                                disabled={productsWithQuantity.length < 1}
                                color="primary"
                                variant="contained">
                                Create Order
                            </BasketOrderBtn>
                        </BasketTotalBox>
                    </>
                )
                    : (
                        <StatusBox>
                            <Empty />
                        </StatusBox>
                    )
            }
        </BasketInfoBox>
    );
}

export default BasketInfo;