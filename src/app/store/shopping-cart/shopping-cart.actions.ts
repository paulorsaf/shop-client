import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product/product';

export type AddProduct = {
    color?: string;
    product: Product;
    size?: string;
};

export const addProduct = createAction(
    '[Shopping Cart] add', props<{shoppingCartProduct: AddProduct}>()
);
