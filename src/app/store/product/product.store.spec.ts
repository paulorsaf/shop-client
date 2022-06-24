import { appInitialState } from '../app-initial-state';
import { ProductState } from './product-state';
import { loadProduct, loadProductFail, loadProductSuccess } from './product.actions';
import { productReducer } from './product.reducers';

describe('Trending store', () => {

    it('loadProduct', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            error: {error: 'error'},
            isLoaded: true,
            isLoading: false,
            product: {id: 1} as any,
        };

        const newState = productReducer(initialState, loadProduct({id: '1'}));

        expect(newState).toEqual({
            ...appInitialState.product,
            product: null,
            error: null,
            isLoaded: false,
            isLoading: true
        });
    });

    it('loadProductSuccess', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            isLoading: true
        };

        const product = {id: 1} as any;
        const newState = productReducer(initialState, loadProductSuccess({product}));

        expect(newState).toEqual({
            ...appInitialState.product,
            product,
            isLoaded: true,
            isLoading: false
        });
    });

    it('loadProductFail', () => {
        const initialState: ProductState = {
            ...appInitialState.product,
            isLoading: true
        };

        const error = {error: 'error'};
        const newState = productReducer(initialState, loadProductFail({error}));

        expect(newState).toEqual({
            ...appInitialState.product,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

});
