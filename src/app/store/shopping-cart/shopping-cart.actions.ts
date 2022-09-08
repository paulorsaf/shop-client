import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";
import { CreditCardPayment, Payment } from "src/app/model/payment/payment";
import { ShoppingCartProduct } from "src/app/model/shopping-cart-product/shopping-cart-product";

export const addProduct = createAction('[Shopping cart] add', props<{product: ShoppingCartProduct}>());
export const decreaseProduct = createAction('[Shopping cart] decrease', props<{product: ShoppingCartProduct}>());
export const removeProduct = createAction('[Shopping cart] remove', props<{product: ShoppingCartProduct}>());

export const openShoppingCart = createAction('[Shopping cart] open');
export const closeShoppingCart = createAction('[Shopping cart] close');

export const setDeliveryAddress = createAction('[Shopping cart] set delivery address', props<{address: Address}>());
export const setDeliveryPrice = createAction('[Shopping cart] set delivery price', props<{deliveryPrice: number}>());

export const makePurchase =
    createAction('[Shopping cart] pucharse', props<{payment: Payment, purchaseId?: string}>());
export const makePurchaseSuccess = createAction('[Shopping cart] pucharse success');
export const makePurchaseFail = createAction('[Shopping cart] pucharse fail', props<{error: any}>());

export const makePurchaseByPix =
    createAction('[Shopping cart] pucharse by pix', props<{purchaseId?: string, receipt: File}>());
export const makePurchaseByMoney =
    createAction('[Shopping cart] pucharse by money', props<{purchaseId?: string}>());
export const makePurchaseByCreditCard =
    createAction('[Shopping cart] pucharse by credit card', props<{
        billingAddress: Address,
        creditCard: CreditCardPayment,
        purchaseId?: string
    }>());

export const clear = createAction('[Shopping cart] clear');