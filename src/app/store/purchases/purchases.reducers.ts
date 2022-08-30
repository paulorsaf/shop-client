import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';
import { PurchasesState } from './purchases.state';

const initialState: PurchasesState = appInitialState.purchases;

const _purchasesReducer = createReducer(
  initialState,
  on(loadPurchases, (state) => ({
    ...state,
    error: undefined,
    isLoaded: false,
    isLoading: true,
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
  }))
);

export const purchasesReducer = (state: PurchasesState, action: any) =>
  _purchasesReducer(state, action);
