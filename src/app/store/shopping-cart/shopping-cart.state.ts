import { createSelector } from '@ngrx/store';
import { Address } from 'src/app/model/address/address';
import { Payment } from 'src/app/model/payment/payment';
import { Product, Stock } from 'src/app/model/product/product';
import { CalculatePriceResponse } from 'src/app/model/purchase/calculate-price';
import { ProductNotes, ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from '../app-state';
import { selectStockOptionSelected } from '../product/product.state';

export type ShoppingCartState = {
    deliveryAddress: Address;
    deliveryPrice: number;
    error: any;
    isCalculatedPrice: boolean;
    isCalculatingPrice: boolean;
    isOpen: boolean;
    isPaid: boolean;
    isPaying: boolean;
    notes: ProductNotes[];
    payment: Payment;
    price: CalculatePriceResponse;
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
export const selectTotalQuantityForProductStock = createSelector(
    (state: AppState) => ({
        product: state.product.product,
        stock: selectStockOptionSelected(state),
        shoppingCartProducts: state.shoppingCart.products
    }),
    (state: {product: Product, stock: Stock, shoppingCartProducts: ShoppingCartProduct[]}) => {
        if (state.stock) {
            const shoppingCartProduct = state.shoppingCartProducts.find(
                s => s.stockOption?.id === state.stock?.id
            );
            return shoppingCartProduct?.amount || 0;
        }
        const hasStock = state.product?.stock?.length >= 0;

        if (!hasStock) {
            return state.shoppingCartProducts?.length ? state.shoppingCartProducts[0].amount : 0;
        }
        return 0;
    }
);