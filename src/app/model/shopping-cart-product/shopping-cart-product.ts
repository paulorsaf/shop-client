import { Product } from '../product/product';

export type ShoppingCartProduct = {
    product: Product;
    stockOption: ShoppingCartProductStockOption;
};

export type ShoppingCartProductStockOption = {
    color?: string;
    id: string;
    quantity?: number;
    size?: string;
};