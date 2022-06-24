import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { ProductState } from './product-state';
import { loadProduct, loadProductFail, loadProductSuccess } from './product.actions';

const initialState: ProductState = appInitialState.product;

const productReduce = createReducer(
  initialState,
  on(loadProduct, (state) => ({
    ...state,
    error: null,
    isLoaded: false,
    isLoading: true,
    product: null
  })),
  on(loadProductSuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    product: action.product
  })),
  on(loadProductFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  }))
);

export const productReducer = (state: ProductState, action: any) =>
  productReduce(state, action);
