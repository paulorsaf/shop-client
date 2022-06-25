import { Product } from 'src/app/model/product/product';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AddProduct } from './shopping-cart.actions';

export type ShoppingCartState = {
    products: ShoppingCartProduct[];
};

export const isProductOnShoppingCart = (state: ShoppingCartState, product: Product) =>
    state.products.some(p => p.product.id === product.id);

export const isAddProductOnShoppingCart = (state: ShoppingCartState, addProduct: AddProduct) => {
    const product = state.products.find(p => p.product.id === addProduct.product.id);
    if (product) {
        return product.color === addProduct.color && product.size === addProduct.size;
    }
    return false;
};
