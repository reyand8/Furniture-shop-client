import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Stack } from '@mui/material';

import { setTotalPrice } from '../../../store/slice/order/order.slice';
import {
    BasketItemAvatar,
    BasketItemPaper,
    BasketItemPrice,
    BasketItemQtyBox,
    BasketItemsSection, BasketQtyText
} from '../../../styles/Basket.styles';
import {
    OrderItemName,
    OrderItemsMainBox,
    SelectedOrderItemsTitle
} from '../../../styles/Order.styles';
import { AppDispatch } from '../../../store/store';
import { IBasketDetailedItem, IBasketItem } from '../../../types/basket.interface';
import { selectCatalog } from '../../../store/slice/catalog/catalog.slice';
import { loadBasketFromStorage, mergeProductsWithQuantities } from '../../../common/utils/basket/basket';
import Loading from '../../status/loading';
import { BASKET_KEY } from '../../../common/common-items';
import Empty from '../../status/empty';
import noImg from '../../../assets/img/noImg.png';


const OrderItems: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [basketFromStorage, setBasketFromStorage] = useState<IBasketItem[]>([]);
    const { productsByIds, loadingProductsByIds, errorProductsByIds } = useSelector(selectCatalog);

    useEffect((): void => {
        loadBasketFromStorage(dispatch, setBasketFromStorage);
    }, [dispatch]);

    const productsWithQuantity: IBasketDetailedItem[] = useMemo(() => {
        return mergeProductsWithQuantities(productsByIds, basketFromStorage);
    }, [productsByIds, basketFromStorage]);

    const totalPrice: number = useMemo(() => {
        return productsWithQuantity.reduce(
            (acc, product) =>
                acc + product.price * product.quantity, 0);
    }, [productsWithQuantity]);

    useEffect((): void => {
        if (productsWithQuantity.length > 0 && productsByIds.length > 0) {
            dispatch(setTotalPrice(`${totalPrice} ${productsByIds[0].currency}`));
        }
    }, [productsWithQuantity, productsByIds, totalPrice, dispatch]);

    useEffect((): void => {
        if (errorProductsByIds || productsWithQuantity.length === 0) {
            localStorage.removeItem(BASKET_KEY);
        }
    }, [errorProductsByIds, productsWithQuantity]);

    if (loadingProductsByIds) {
        return <Loading />;
    }

    if (errorProductsByIds || productsWithQuantity.length === 0) {
        return <Empty />;
    }

    return (
        <OrderItemsMainBox>
            <SelectedOrderItemsTitle>
                Selected Items <DoneIcon color="success"/>
            </SelectedOrderItemsTitle>
            <BasketItemsSection>
                <Stack spacing={2}>
                    {productsWithQuantity.map(
                        ({ id, images, name, quantity, price, currency }: IBasketDetailedItem) => (
                        <BasketItemPaper key={id} elevation={2}>
                            <BasketItemAvatar
                                variant="rounded"
                                src={images[0] || noImg}
                            />
                            <Box flex={1}>
                                <OrderItemName>
                                    {name}
                                </OrderItemName>
                            </Box>
                            <BasketItemQtyBox flex={2}>
                                <BasketQtyText>
                                    {quantity}
                                </BasketQtyText>
                            </BasketItemQtyBox>
                            <BasketItemPrice>
                                {(price * quantity).toFixed(2)} {currency}
                            </BasketItemPrice>
                        </BasketItemPaper>
                    ))}
                </Stack>
            </BasketItemsSection>
        </OrderItemsMainBox>
    )
}

export default OrderItems;