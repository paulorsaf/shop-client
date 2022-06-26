import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product/product';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';

export type AddProduct = {
    color?: string;
    product: Product;
    size?: string;
};

export const addProduct = createAction(
    '[Shopping Cart] add', props<{shoppingCartProduct: AddProduct}>()
);
export const removeProduct = createAction(
    '[Shopping Cart] remove item', props<{shoppingCartProduct: ShoppingCartProduct}>()
);

export const openShoppingCart = createAction('[Shopping Cart] open');
export const closeShoppingCart = createAction('[Shopping Cart] close');

export const plusItem = createAction(
    '[Shopping Cart] plus item', props<{shoppingCartProduct: ShoppingCartProduct}>()
);
export const minusItem = createAction(
    '[Shopping Cart] minus item', props<{shoppingCartProduct: ShoppingCartProduct}>()
);
