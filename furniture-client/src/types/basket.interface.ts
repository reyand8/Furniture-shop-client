import { IProduct } from './catalog.interface';

export interface IBasketItem {
    id: string;
    quantity: number;
}

export interface IBasketDetailedItem extends IProduct {
    quantity: number;
}

