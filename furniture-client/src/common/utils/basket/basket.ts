import React from 'react';

import { IBasketDetailedItem, IBasketItem } from '../../../types/basket.interface';
import { IProduct } from '../../../types/catalog.interface';
import { BASKET_KEY } from '../../common-items';
import { fetchProductsByIdsRequest } from '../../../store/slice/catalog/catalog.slice';
import { AppDispatch } from '../../../store/store';
import { setNewOrderItems } from '../../../store/slice/order/order.slice';


/**
 * Retrieves the basket from localStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 */
export const getBasket = (): IBasketItem[] => {
    const basketStr: string | null = localStorage.getItem(BASKET_KEY);
    if (!basketStr) return [];
    try {
        return JSON.parse(basketStr);
    } catch {
        return [];
    }
};

/**
 * Saves the given basket array to localStorage.
 */
export const saveBasket = (basket: IBasketItem[]): void => {
    localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
};

/**
 * Adds a product to the basket by ID.
 * Increments quantity if the product already exists.
 */
export const addToBasket = (id: string): void => {
    const basket: IBasketItem[] = getBasket();
    const existingItemIndex: number = basket.findIndex((item: IBasketItem): boolean => item.id === id);
    if (existingItemIndex >= 0) {
        basket[existingItemIndex].quantity += 1;
    } else {
        basket.push({ id, quantity: 1 });
    }
    saveBasket(basket);
};

/**
 * Merges product details with quantities from the basket.
 * Returns an array of detailed basket items.
 */
export const mergeProductsWithQuantities = (
    products: IProduct[],
    basket: IBasketItem[]
): IBasketDetailedItem[] => {
    return products.map(product => {
        const basketItem: IBasketItem | undefined = basket.find(item => item.id === product.id);
        return {
            ...product,
            quantity: basketItem?.quantity || 0
        };
    });
};

/**
 * Loads the basket from localStorage, updates state and dispatches product fetch.
 */
export const loadBasketFromStorage = (
    dispatch: AppDispatch, setBasket: React.Dispatch<React.SetStateAction<IBasketItem[]>>): void => {
    const stored: string | null = localStorage.getItem(BASKET_KEY);
    if (!stored) return;
    const parsed: IBasketItem[] = JSON.parse(stored);
    dispatch(setNewOrderItems(parsed));
    setBasket(parsed);
    const ids: string[] = parsed.map(item => item.id);
    if (ids.length > 0) {
        dispatch(fetchProductsByIdsRequest({ ids }));
    }
};

/**
 * Saves the updated basket to localStorage and updates component state.
 */
export const saveBasketToStorage = (
    updatedBasket: IBasketItem[], setBasket: React.Dispatch<React.SetStateAction<IBasketItem[]>>): void => {
    localStorage.setItem(BASKET_KEY, JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
};