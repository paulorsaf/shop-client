import { appInitialState } from '../app-initial-state';
import { loadProductsByCategory, loadProductsByCategoryFail, loadProductsByCategorySuccess } from './products.actions';
import { productsReducer } from './products.reducers';
import { ProductsState } from './products.state';

describe('Products store', () => {

    it('loadProductsByCategory', () => {
        const initialState: ProductsState = {
            ...appInitialState.products,
            error: {},
            isLoaded: true,
            isLoading: false,
            products: [{id: 1}] as any
        };

        const newState = productsReducer(initialState, loadProductsByCategory({id: '1'}));

        expect(newState).toEqual({
            ...appInitialState.products,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            products: []
        });
    });

    it('loadProductsByCategorySuccess', () => {
        const initialState: ProductsState = {
            ...appInitialState.products,
            isLoading: true
        };

        const products = [{id: 1}] as any;
        const newState = productsReducer(initialState, loadProductsByCategorySuccess({products}));

        expect(newState).toEqual({
            ...appInitialState.products,
            isLoaded: true,
            isLoading: false,
            products
        });
    });

    it('loadProductsByCategoryFail', () => {
        const initialState: ProductsState = {
            ...appInitialState.products,
            isLoading: true
        };

        const error = {error: 'error'};
        const newState = productsReducer(initialState, loadProductsByCategoryFail({error}));

        expect(newState).toEqual({
            ...appInitialState.products,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

});
