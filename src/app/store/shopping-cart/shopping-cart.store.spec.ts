import { Product } from 'src/app/model/product/product';
import { appInitialState } from '../app-initial-state';
import { AppState } from '../app-state';
import { AddProduct, addProduct, closeShoppingCart, minusItem, openShoppingCart, plusItem, removeProduct } from './shopping-cart.actions';
import { shoppingCartReducer } from './shopping-cart.reducers';
import { isAddProductOnShoppingCart, isProductOnShoppingCart, ShoppingCartState, totalPrice, totalQuantity } from './shopping-cart.state';

describe('Shopping cart store', () => {

    describe('given totalPrice', () => {

        let state: AppState;

        beforeEach(() => {
            state = {
                shoppingCart: {
                    products: [{
                        product: {price: 10},
                        quantity: 5
                    }, {
                        product: {price: 20},
                        quantity: 5
                    }, {
                        product: {price: 50},
                        quantity: 2
                    }]
                }
            } as any;
        });

        it('when no discount, then sum normal prices', () => {
            expect(totalPrice(state)).toEqual(250);
        });

        it('when there is a discount, then sum normal prices with discount prices', () => {
            state.shoppingCart.products[2].product.priceWithDiscount = '25';

            expect(totalPrice(state)).toEqual(200);
        });

    });

    describe('given isProductOnShoppingCart', () => {

        const state: ShoppingCartState = {
            products: [{product: {id: 1}}]
        } as any;

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
                products: [{product: {id: 1}}]
            } as any;
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

    it('totalQuantity', () => {
        const state: AppState = {
            shoppingCart: {
                products: [{quantity: 5}, {quantity: 5}, {quantity: 2}]
            }
        } as any;

        expect(totalQuantity(state)).toEqual(12);
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

    it('openShoppingCart', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            isOpen: false
        };

        const newState = shoppingCartReducer(initialState, openShoppingCart());

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            isOpen: true
        });
    });

    it('closeShoppingCart', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            isOpen: true
        };

        const newState = shoppingCartReducer(initialState, closeShoppingCart());

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            isOpen: false
        });
    });

    it('plusItem', () => {
        const shoppingCartProduct = {product: {id: 1}, quantity: 2} as any;
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            products: [shoppingCartProduct] as any
        };

        const newState = shoppingCartReducer(initialState, plusItem({shoppingCartProduct}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            products: [{...shoppingCartProduct, quantity: 3}]
        });
    });

    it('minusItem', () => {
        const shoppingCartProduct = {product: {id: 1}, quantity: 2} as any;
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            products: [shoppingCartProduct] as any
        };

        const newState = shoppingCartReducer(initialState, minusItem({shoppingCartProduct}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            products: [{...shoppingCartProduct, quantity: 1}]
        });
    });

    it('removeProduct', () => {
        const shoppingCartProduct = {product: {id: 1}, quantity: 2} as any;
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            products: [shoppingCartProduct] as any
        };

        const newState = shoppingCartReducer(initialState, removeProduct({shoppingCartProduct}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            products: []
        });
    });

});
