import { createSelector } from '@ngrx/store';
import { Address } from 'src/app/model/address/address';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from '../app-state';

export type ShoppingCartState = {
    isOpen: boolean;
    deliveryAddress: Address;
    products: ShoppingCartProduct[];
}

export const selectShoppingCartProducts = (state: AppState) => state.shoppingCart.products;
export const selectTotalQuantity = createSelector(
    selectShoppingCartProducts,
    (products: ShoppingCartProduct[]) => {
        let total = 0;
        products.forEach(p => total += p.amount);
        return total;
    }
);
export const selectTotalPrice = createSelector(
    selectShoppingCartProducts,
    (products: ShoppingCartProduct[]) => {
        let total = 0;
        products.forEach(p => {
            let price = p.product.priceWithDiscount || p.product.price;
            total += (p.amount * price);
        });
        return total;
    }
);