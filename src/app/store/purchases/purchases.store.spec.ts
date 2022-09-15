import { appInitialState } from '../app-initial-state';
import { loadPurchases, loadPurchasesSuccess, loadPurchasesFail, loadLastPurchase, loadLastPurchaseSuccess, loadLastPurchaseFail, loadPaymentPurchaseById, loadPaymentPurchaseByIdFail, loadPaymentPurchaseByIdSuccess } from './purchases.actions';
import { purchasesReducer } from './purchases.reducers';
import { PurchasesState } from './purchases.state';

describe('Purchases store', () => {

    const error = {id: 1} as any;

    it('loadPurchases', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            error: {},
            isLoaded: true,
            isLoading: false,
            isLoadedPaymentPurchase: true,
            isLoadingPaymentPurchase: false,
            paymentPurchase: {} as any
        };

        const newState = purchasesReducer(initialState, loadPurchases());

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            isLoadedPaymentPurchase: false,
            isLoadingPaymentPurchase: false,
            paymentPurchase: undefined,
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

        const newState = purchasesReducer(initialState, loadPurchasesFail({error}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error,
            isLoaded: false,
            isLoading: false
        });
    });

    it('loadLastPurchase', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            error: {},
            isLoadedPaymentPurchase: true,
            isLoadingPaymentPurchase: false,
            paymentPurchase: {} as any
        };

        const newState = purchasesReducer(initialState, loadLastPurchase());

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error: undefined,
            isLoadedPaymentPurchase: false,
            isLoadingPaymentPurchase: true,
            paymentPurchase: undefined
        });
    });

    it('loadLastPurchaseSuccess', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoadingPaymentPurchase: true
        };

        const purchase = {id: "anyId"} as any;
        const newState = purchasesReducer(initialState, loadLastPurchaseSuccess({purchase}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            isLoadedPaymentPurchase: true,
            isLoadingPaymentPurchase: false,
            paymentPurchase: purchase
        });
    });

    it('loadLastPurchaseFail', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoadingPaymentPurchase: true
        };

        const newState = purchasesReducer(initialState, loadLastPurchaseFail({error}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error,
            isLoadedPaymentPurchase: false,
            isLoadingPaymentPurchase: false
        });
    });

    it('loadPaymentPurchaseById', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            error: {},
            isLoadedPaymentPurchase: true,
            isLoadingPaymentPurchase: false,
            paymentPurchase: {} as any
        };

        const newState = purchasesReducer(initialState, loadPaymentPurchaseById());

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error: undefined,
            isLoadedPaymentPurchase: false,
            isLoadingPaymentPurchase: true,
            paymentPurchase: undefined
        });
    });

    it('loadPaymentPurchaseByIdSuccess', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoadingPaymentPurchase: true
        };

        const purchase = {id: "anyId"} as any;
        const newState = purchasesReducer(initialState, loadPaymentPurchaseByIdSuccess({purchase}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            isLoadedPaymentPurchase: true,
            isLoadingPaymentPurchase: false,
            paymentPurchase: purchase
        });
    });

    it('loadPaymentPurchaseByIdFail', () => {
        const initialState: PurchasesState = {
            ...appInitialState.purchases,
            isLoadingPaymentPurchase: true
        };

        const newState = purchasesReducer(initialState, loadPaymentPurchaseByIdFail({error}));

        expect(newState).toEqual({
            ...appInitialState.purchases,
            error,
            isLoadedPaymentPurchase: false,
            isLoadingPaymentPurchase: false
        });
    });

});
