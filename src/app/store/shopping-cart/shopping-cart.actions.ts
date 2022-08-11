import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";
import { ShoppingCartProduct } from "src/app/model/shopping-cart-product/shopping-cart-product";

export const addProduct = createAction('[Shopping cart] add', props<{product: ShoppingCartProduct}>());
export const decreaseProduct = createAction('[Shopping cart] decrease', props<{product: ShoppingCartProduct}>());
export const removeProduct = createAction('[Shopping cart] remove', props<{product: ShoppingCartProduct}>());

export const openShoppingCart = createAction('[Shopping cart] open');
export const closeShoppingCart = createAction('[Shopping cart] close');

export const setDeliveryAddress = createAction('[Shopping cart] set delivery address', props<{address: Address}>());