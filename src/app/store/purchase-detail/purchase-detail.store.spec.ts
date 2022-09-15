import { appInitialState } from '../app-initial-state';
import { clearPurchaseDetail, loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './purchase-detail.action';
import { purchaseDetailReducer } from './purchase-detail.reducers';
import { PurchaseDetailState } from './purchase-detail.state';

describe('Purchase detail store', () => {

    it('loadPurchaseDetail', () => {
        const initialState: PurchaseDetailState = {
            ...appInitialState.purchaseDetail,
            error: {},
            isLoaded: true,
            isLoading: false,
            purchase: {} as any
        };

        const newState = purchaseDetailReducer(initialState, loadPurchaseDetail({id: "anyId"}));

        expect(newState).toEqual({
            ...appInitialState.purchaseDetail,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            purchase: undefined
        });
    });

    it('loadPurchaseDetailSuccess', () => {
        const initialState: PurchaseDetailState = {
            ...appInitialState.purchaseDetail,
            isLoading: true
        };

        const purchase = {id: 1} as any;
        const newState = purchaseDetailReducer(initialState, loadPurchaseDetailSuccess({purchase}));

        expect(newState).toEqual({
            ...appInitialState.purchaseDetail,
            isLoaded: true,
            isLoading: false,
            purchase
        });
    });

    it('loadPurchaseDetailFail', () => {
        const initialState: PurchaseDetailState = {
            ...appInitialState.purchaseDetail,
            isLoading: true
        };

        const error = {id: 1} as any;
        const newState = purchaseDetailReducer(initialState, loadPurchaseDetailFail({error}));

        expect(newState).toEqual({
            ...appInitialState.purchaseDetail,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

    it('clearPurchaseDetail', () => {
        const initialState: PurchaseDetailState = {
            ...appInitialState.purchaseDetail,
            error: {},
            isLoaded: true,
            isLoading: true,
            purchase: {} as any
        };

        const newState = purchaseDetailReducer(initialState, clearPurchaseDetail());

        expect(newState).toEqual({
            ...appInitialState.purchaseDetail
        });
    });

});
