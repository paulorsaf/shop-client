import { appInitialState } from '../app-initial-state';
import { loadPurchases, loadPurchasesSuccess, loadPurchasesFail } from './purchases.actions';
import { purchasesReducer } from './purchases.reducers';
import { PurchasesState } from './purchases.state';

describe('Purchases store', () => {

    it('loadPurchases', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            error: {},
            isLoaded: true,
            isLoading: false
        };

        const newState = purchasesReducer(initialState, loadPurchases());

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error: null,
            isLoaded: false,
            isLoading: true,
            purchases: []
        });
    });

    it('loadPurchasesSuccess', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoading: true
        };

        const purchases = [{id: 1}] as any;
        const newState = purchasesReducer(initialState, loadPurchasesSuccess({purchases}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            isLoaded: true,
            isLoading: false,
            purchases
        });
    });

    it('loadPurchasesFail', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoading: true
        };

        const error = {id: 1} as any;
        const newState = purchasesReducer(initialState, loadPurchasesFail({error}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

});
