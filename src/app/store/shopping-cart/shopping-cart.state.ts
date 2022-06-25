import { Product } from 'src/app/model/product/product';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AddProduct } from './shopping-cart.actions';

export type ShoppingCartState = {
    products: ShoppingCartProduct[];
};

export const isProductOnShoppingCart = (state: ShoppingCartState, product: Product) =>
    state.products.some(p => p.product.id === product.id);

export const isAddProductOnShoppingCart = (state: ShoppingCartState, addProduct: AddProduct) =>
    state.products.some(p => isShoppingCardProductSameAsAddProduct(p, addProduct));

export const isShoppingCardProductSameAsAddProduct = (shoppingCartProduct: ShoppingCartProduct, addProduct: AddProduct) =>
    shoppingCartProduct.product.id === addProduct.product.id &&
    shoppingCartProduct.color === addProduct.color &&
    shoppingCartProduct.size === addProduct.size;
