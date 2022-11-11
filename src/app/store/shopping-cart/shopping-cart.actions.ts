import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";
import { CreditCardPayment, Payment } from "src/app/model/payment/payment";
import { ProductNotes } from "src/app/model/product/product-notes";
import { Cupom } from "src/app/model/purchase/cupom";
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
    createAction('[Shopping cart] pucharse by pix', props<{
        cupom: string,
        purchaseId?: string,
        receipt: File
    }>());
export const makePurchaseByMoney = createAction('[Shopping cart] pucharse by money', props<{
    cupom: string,
    purchaseId?: string
}>());
export const makePurchaseByCreditCard =
    createAction('[Shopping cart] pucharse by credit card', props<{
        billingAddress: Address,
        creditCard: CreditCardPayment,
        cupom: string,
        purchaseId?: string
    }>());
export const makePurchaseBySavedCreditCard =
    createAction('[Shopping cart] pucharse by saved credit card', props<{
        creditCardId: string,
        cupom: string,
        purchaseId?: string
    }>());

export const clear = createAction('[Shopping cart] clear');

export const addProductNotes = createAction('[Shopping cart] add notes', props<{notes: ProductNotes}>());
export const removeProductNotes = createAction('[Shopping cart] remove notes', props<{productId: string}>());

export const loadCupom = createAction('[Purchases] load cupom', props<{cupom: string}>());
export const loadCupomSuccess = createAction('[Purchases] load cupom success', props<{cupom: Cupom}>());
export const loadCupomFail = createAction('[Purchases] load cupom fail', props<{error: any}>());

export const savePurchase = createAction('[Purchases] save');
export const savePurchaseSuccess = createAction('[Purchases] save success');
export const savePurchaseFail = createAction('[Purchases] save fail', props<{error: any}>());