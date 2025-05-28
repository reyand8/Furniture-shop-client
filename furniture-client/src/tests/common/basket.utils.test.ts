import {
    addToBasket,
    getBasket,
    mergeProductsWithQuantities,
    saveBasket
} from '../../common/utils/basket/basket';
import { IProduct } from '../../types/catalog.interface';


describe('basket utils', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('getBasket should return empty array if no data in localStorage', () => {
        expect(getBasket()).toEqual([]);
    });

    it('saveBasket and getBasket should work together', () => {
        const basket = [{ id: '1', quantity: 2 }];
        saveBasket(basket);
        expect(getBasket()).toEqual(basket);
    });

    it('addToBasket should add new item to basket', () => {
        addToBasket('1');
        expect(getBasket()).toEqual([{ id: '1', quantity: 1 }]);
    });

    it('addToBasket should increase quantity if item already exists', () => {
        addToBasket('1');
        addToBasket('1');
        expect(getBasket()).toEqual([{ id: '1', quantity: 2 }]);
    });

    it('mergeProductsWithQuantities should return products with quantities from basket', () => {
        const products: IProduct[] = [
            { id: '1', name: 'Product 1', price: 100 } as IProduct,
            { id: '2', name: 'Product 2', price: 200 } as IProduct,
        ];
        const basket = [{ id: '1', quantity: 2 }];
        const result = mergeProductsWithQuantities(products, basket);
        expect(result).toEqual([
            { id: '1', name: 'Product 1', price: 100, quantity: 2 },
            { id: '2', name: 'Product 2', price: 200, quantity: 0 },
        ]);
    });
});
