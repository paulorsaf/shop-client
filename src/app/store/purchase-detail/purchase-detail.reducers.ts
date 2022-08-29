import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './purchase-detail.action';
import { PurchaseDetailState } from './purchase-detail.state';

const initialState: PurchaseDetailState = appInitialState.purchaseDetail;

const _purchaseDetailReducer = createReducer(
  initialState,
  on(loadPurchaseDetail, (state) => ({
    ...state,
    error: null,
    isLoaded: false,
    isLoading: true,
    purchase: undefined
  })),
  on(loadPurchaseDetailSuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    purchase: action.purchase
  })),
  on(loadPurchaseDetailFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  }))
);

export const purchaseDetailReducer = (state: PurchaseDetailState, action: any) =>
  _purchaseDetailReducer(state, action);
