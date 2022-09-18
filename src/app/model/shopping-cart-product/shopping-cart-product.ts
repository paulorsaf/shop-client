import { Product } from '../product/product';

export type ShoppingCartProduct = {
    amount?: number;
    product: Product;
    stockOption?: ShoppingCartProductStockOption;
};

export type ShoppingCartProductStockOption = {
    color?: string;
    id: string;
    size?: string;
};

export type ProductNotes = {
    productId: string;
    notes: string;
}