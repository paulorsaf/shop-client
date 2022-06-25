import { Product } from '../product/product';

export type ShoppingCartProduct = {
    color?: string;
    product: Product;
    quantity?: number;
    size?: string;
};
