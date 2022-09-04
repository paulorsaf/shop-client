import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { appInitialState } from '../app-initial-state';
import { AppState } from '../app-state';
import { addProduct, clear, closeShoppingCart, decreaseProduct, makePurchase, makePurchaseFail, makePurchaseSuccess, openShoppingCart, removeProduct, setDeliveryAddress, setDeliveryPrice } from './shopping-cart.actions';
import { shoppingCartReducer } from './shopping-cart.reducers';
import { selectTotalPrice, selectTotalQuantity, selectTotalQuantityForProductStock, ShoppingCartState } from './shopping-cart.state';

describe('Shopping cart store', () => {

    const product: ShoppingCartProduct = {
        amount: 1,
        product: {id: '1'} as any,
        stockOption: {id: '1', color: 'red', size: 'P'}
    };

    describe('selectTotalQuantityForProductStock', () => {
        let state: AppState;

        beforeEach(() => {
            state = {
                product: {
                    product: {
                        id: "anyProductId1"
                    }
                },
                shoppingCart: {
                    products: [
                        { product: {id: "anyProductId1"}, amount: 2 },
                        { product: {id: "anyProductId2"}, amount: 3, stockOption: {
                            id: "stockOption1", color: "anyColor1", size: "anySize1"
                        } },
                        { product: {id: "anyProductId2"}, amount: 5, stockOption: {
                            id: "stockOption2", color: "anyColor2", size: "anySize2"
                        } }
                    ]
                }
            } as any;
        })

        it('given product doesnt have stock, then return product amount', () => {
            expect(selectTotalQuantityForProductStock(state)).toEqual(2);
        })

        it('given product has stock, then return product stock amount', () => {
            state.product.product.id = "anyProductId2";
            state.product.product.stock = [
                { color: "anyColor1", id: "stockOption1", size: "anySize1" } as any,
                { color: "anyColor2", id: "stockOption2", size: "anySize2" } as any
            ];
            state.product.selectedColor = "anyColor2";
            state.product.selectedSize = "anySize2";

            expect(selectTotalQuantityForProductStock(state)).toEqual(5);
        })
    })

    it('selectTotalQuantity', () => {
        const state: AppState = {
            shoppingCart: {
                products: [{ amount: 1 }, { amount: 2 },{ amount: 3 }]
            }
        } as any;

        expect(selectTotalQuantity(state)).toEqual(6);
    })

    describe('given selectTotalPrice', () => {

        it('when no discount, then select total price with normal price', () => {
            const state: AppState = {
                shoppingCart: {
                    products: [
                        { amount: 1, product: { price: 10 } },
                        { amount: 2, product: { price: 20 } },
                        { amount: 3, product: { price: 30 } }
                    ]
                }
            } as any;
    
            expect(selectTotalPrice(state)).toEqual(140);
        })

        it('when discount, then select total price with discount price', () => {
            const state: AppState = {
                shoppingCart: {
                    products: [
                        { amount: 1, product: { priceWithDiscount: 5 } },
                        { amount: 2, product: { priceWithDiscount: 10 } },
                        { amount: 3, product: { priceWithDiscount: 15 } }
                    ]
                }
            } as any;
    
            expect(selectTotalPrice(state)).toEqual(70);
        })

    })

    describe('given addProduct', () => {

        it('when shopping cart is empty, then add product with amount of 1', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
            };

            const newState = shoppingCartReducer(initialState, addProduct({product}));
    
            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [{
                    amount: 1,
                    ...product
                }]
            });
        });

        it('when shopping cart has a product with different id, then add new product with amount of 1', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
                products: [{product: {id: '2'}}] as any
            };

            const newState = shoppingCartReducer(initialState, addProduct({product}));
    
            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [
                    { product: {id: '2'} } as any,
                    { ...product, amount: 1} as any
                ]
            });
        });

        it('when shopping cart has a product with same stock config, then add amount to product', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
                products: [product]
            };

            const newState = shoppingCartReducer(initialState, addProduct({product}));
    
            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [{ ...product, amount: 2}]
            });
        });

        it('when shopping cart has a product with same id and different stock config, then add product with amount of 1', () => {
            const initialState: ShoppingCartState = {
                ...appInitialState.shoppingCart,
                products: [product]
            };

            const newProduct = {
                ...product,
                stockOption: {
                    ...product.stockOption,
                    id: 'anotherId'
                }
            };
            const newState = shoppingCartReducer(initialState, addProduct({product: newProduct}));
    
            expect(newState).toEqual({
                ...appInitialState.shoppingCart,
                products: [
                    product,
                    newProduct
                ]
            });
        });

    })

    it('decreaseProduct', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            products: [{...product, amount: 2}]
        };

        const newState = shoppingCartReducer(initialState, decreaseProduct({product: product}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            products: [{...product, amount: 1}]
        });
    });

    it('removeProduct', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            products: [product]
        };

        const newState = shoppingCartReducer(initialState, removeProduct({product: product}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            products: []
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
    })

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
    })

    it('setDeliveryAddress', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart
        };

        const address = {id: 1} as any;
        const newState = shoppingCartReducer(initialState, setDeliveryAddress({address}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            deliveryAddress: address
        });
    })

    it('makePurchase', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            error: {},
            isPaid: true,
            isPaying: false
        };

        const payment = {
            type:  "anyType",
            receipt: {id: 1} as any
        }
        const newState = shoppingCartReducer(initialState, makePurchase({payment}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            error: undefined,
            isPaid: false,
            isPaying: true,
            payment
        });
    })

    it('makePurchaseSuccess', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            isPaying: true
        };

        const newState = shoppingCartReducer(initialState, makePurchaseSuccess());

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            isPaid: true,
            isPaying: false
        });
    })

    it('makePurchaseFail', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            isPaying: true
        };

        const error = {error: "error"};
        const newState = shoppingCartReducer(initialState, makePurchaseFail({error}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            error,
            isPaid: false,
            isPaying: false
        });
    })

    it('clear', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
            deliveryAddress: {} as any,
            error: {} as any,
            isOpen: true,
            isPaid: true,
            isPaying: true,
            payment: {} as any,
            products: [{} as any]
        };

        const newState = shoppingCartReducer(initialState, clear());

        expect(newState).toEqual({
            ...appInitialState.shoppingCart
        });
    })

    it('setDeliveryPrice', () => {
        const initialState: ShoppingCartState = {
            ...appInitialState.shoppingCart,
        };

        const newState = shoppingCartReducer(initialState, setDeliveryPrice({deliveryPrice: 10}));

        expect(newState).toEqual({
            ...appInitialState.shoppingCart,
            deliveryPrice: 10
        });
    })

});
