import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadLastPurchase, loadLastPurchaseFail, loadLastPurchaseSuccess, loadPaymentPurchaseById, loadPaymentPurchaseByIdFail, loadPaymentPurchaseByIdSuccess, loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';
import { PurchasesState } from './purchases.state';

const initialState: PurchasesState = appInitialState.purchases;

const _purchasesReducer = createReducer(
  initialState,
  on(loadPurchases, (state) => ({
    ...state,
    error: undefined,
    isLoaded: false,
    isLoading: true,
    isLoadedPaymentPurchase: false,
    isLoadingPaymentPurchase: false,
    paymentPurchase: undefined,
    purchases: []
  })),
  on(loadPurchasesSuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    purchases: action.purchases
  })),
  on(loadPurchasesFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  })),
  on(loadLastPurchase, (state) => ({
    ...state,
    error: undefined,
    isLoadedPaymentPurchase: false,
    isLoadingPaymentPurchase: true,
    paymentPurchase: undefined
  })),
  on(loadLastPurchaseSuccess, (state, action) => ({
    ...state,
    isLoadedPaymentPurchase: true,
    isLoadingPaymentPurchase: false,
    paymentPurchase: action.purchase
  })),
  on(loadLastPurchaseFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoadedPaymentPurchase: false,
    isLoadingPaymentPurchase: false
  })),
  on(loadPaymentPurchaseById, (state) => ({
    ...state,
    error: undefined,
    isLoadedPaymentPurchase: false,
    isLoadingPaymentPurchase: true,
    paymentPurchase: undefined
  })),
  on(loadPaymentPurchaseByIdSuccess, (state, action) => ({
    ...state,
    isLoadedPaymentPurchase: true,
    isLoadingPaymentPurchase: false,
    paymentPurchase: action.purchase
  })),
  on(loadPaymentPurchaseByIdFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoadedPaymentPurchase: false,
    isLoadingPaymentPurchase: false
  }))
);

export const purchasesReducer = (state: PurchasesState, action: any) =>
  _purchasesReducer(state, action);
