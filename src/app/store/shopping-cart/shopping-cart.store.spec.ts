import { Product } from 'src/app/model/product/product';
import { appInitialState } from '../app-initial-state';
import { AddProduct, addProduct } from './shopping-cart.actions';
import { shoppingCartReducer } from './shopping-cart.reducers';
import { isAddProductOnShoppingCart, isProductOnShoppingCart, ShoppingCartState } from './shopping-cart.state';

describe('Shopping cart store', () => {

    describe('given isProductOnShoppingCart', () => {

        const state: ShoppingCartState = {
            products: [{product: {id: 1}}] as any
        };

        it('when product exists on shopping cart, then return true', () => {
            const product: Product = {id: 1} as any;

            expect(isProductOnShoppingCart(state, product)).toBeTruthy();
        });

        it('when product doesnt exist on shopping cart, then return false', () => {
            const product: Product = {id: 2} as any;

            expect(isProductOnShoppingCart(state, product)).toBeFalsy();
        });

    });

    describe('given isAddProductOnShoppingCart', () => {

        let state: ShoppingCartState;

        beforeEach(() => {
            state = {
                products: [{product: {id: 1}}] as any
            };
        });

        it('when product exists on shopping cart, then return true', () => {
            const product: AddProduct = {product: {id: 1}} as any;

            expect(isAddProductOnShoppingCart(state, product)).toBeTruthy();
        });

        it('when product doesnt exist on shopping cart, then return false', () => {
            const product: AddProduct = {product: {id: 2}} as any;

            expect(isAddProductOnShoppingCart(state, product)).toBeFalsy();
        });

        it('when product exists on shopping cart with equal sizes, then return true', () => {
            state.products[0].size = 'M';
            const product: AddProduct = {product: {id: 1}, size: 'M'} as any;

            expect(isAddProductOnShoppingCart(state, product)).toBeTruthy();
        });

        it('when product exists on shopping cart with different sizes, then return false', () => {
            state.products[0].size = 'M';
            const product: AddProduct = {product: {id: 1}, size: 'P'} as any;

            expect(isAddProductOnShoppingCart(state, product)).toBeFalsy();
        });

    });

    describe('given addProduct', () => {

        it('when products are empty, then new state should have one product', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart
            };

            const shoppingCartProduct = {product: {id: 1}} as any;
            const newState = shoppingCartReducer(initialState, addProduct({shoppingCartProduct}));

            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [{...shoppingCartProduct, quantity: 1}],
            });
        });

        it('when there is one product, then new state should have two products', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
                products: [{product: {id: 1}, quantity: 1} as any]
            };

            const shoppingCartProduct = {product: {id: 2}} as any;
            const newState = shoppingCartReducer(initialState, addProduct({shoppingCartProduct}));

            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [
                    ...initialState.products,
                    {...shoppingCartProduct, quantity: 1}
                ],
            });
        });

        it('when there is one product and product added is the same, then new state should have product with quantity of two', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
                products: [{product: {id: 1}, quantity: 1} as any]
            };

            const shoppingCartProduct = {product: {id: 1}} as any;
            const newState = shoppingCartReducer(initialState, addProduct({shoppingCartProduct}));

            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [{...shoppingCartProduct, quantity: 2}],
            });
        });

    });

});
