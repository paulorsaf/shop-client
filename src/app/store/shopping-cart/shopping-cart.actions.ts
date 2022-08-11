import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";
import { ShoppingCartProduct } from "src/app/model/shopping-cart-product/shopping-cart-product";

export const addProduct = createAction('[Shopping cart] add', props<{product: ShoppingCartProduct}>());
export const decreaseProduct = createAction('[Shopping cart] decrease', props<{product: ShoppingCartProduct}>());
export const removeProduct = createAction('[Shopping cart] remove', props<{product: ShoppingCartProduct}>());

export const openShoppingCart = createAction('[Shopping cart] open');
export const closeShoppingCart = createAction('[Shopping cart] close');

export const setDeliveryAddress = createAction('[Shopping cart] set delivery address', props<{address: Address}>());

export const makePurchase = createAction('[Shopping cart] pucharse', props<{purchase: Purchase}>());
export const makePurchaseSuccess = createAction('[Shopping cart] pucharse success');
export const makePurchaseFail = createAction('[Shopping cart] pucharse fail', props<{error: any}>());

export const makePurchaseByPix = createAction('[Shopping cart] pucharse by pix', props<{purchase: Purchase}>());
export const makePurchaseByMoney = createAction('[Shopping cart] pucharse by money', props<{purchase: Purchase}>());

export type Purchase = {
    paymentType: string;
    receipt?: File
}