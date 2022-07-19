import { Product } from 'src/app/model/product/product';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from '../app-state';
import { AddProduct } from './shopping-cart.actions';

export type ShoppingCartState = {
    isOpen: boolean;
    products: ShoppingCartProduct[];
};

export const totalPrice = (state: AppState) => {
    let total = 0;
    state.shoppingCart.products.forEach(p => {
        let price = 0;
        if (p.product.priceWithDiscount) {
            price = p.product.priceWithDiscount;
        } else {
            price = p.product.price;
        }
        total = total + (price * p.quantity);
    });
    return total;
};

export const totalQuantity = (state: AppState) => {
    let total = 0;
    state.shoppingCart.products.forEach(p => total += p.quantity);
    return total;
};

export const isProductOnShoppingCart = (state: ShoppingCartState, product: Product) =>
    state.products.some(p => p.product.id === product.id);

export const isAddProductOnShoppingCart = (state: ShoppingCartState, addProduct: AddProduct) =>
    state.products.some(p => isShoppingCardProductSameAsAddProduct(p, addProduct));

export const isShoppingCardProductSameAsAddProduct = (shoppingCartProduct: ShoppingCartProduct, addProduct: AddProduct) =>
    shoppingCartProduct.product.id === addProduct.product.id &&
    shoppingCartProduct.color === addProduct.color &&
    shoppingCartProduct.size === addProduct.size;
