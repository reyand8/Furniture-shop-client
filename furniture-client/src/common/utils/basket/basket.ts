import { IBasketDetailedItem, IBasketItem } from '../../../types/basket.interface';
import { IProduct } from '../../../types/catalog.interface';
import { BASKET_KEY } from '../../common-items';


export const getBasket = (): IBasketItem[] => {
    const basketStr: string | null = localStorage.getItem(BASKET_KEY);
    if (!basketStr) return [];
    try {
        return JSON.parse(basketStr);
    } catch {
        return [];
    }
};

export const saveBasket = (basket: IBasketItem[]): void => {
    localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
};

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