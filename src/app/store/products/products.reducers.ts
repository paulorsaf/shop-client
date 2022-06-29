import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadProductsByCategory, loadProductsByCategoryFail, loadProductsByCategorySuccess } from './products.actions';
import { ProductsState } from './products.state';

const initialState: ProductsState = appInitialState.products;

const productsReduce = createReducer(
  initialState,
  on(loadProductsByCategory, (state) => ({
    ...state,
    error: null,
    isLoaded: false,
    isLoading: true,
    products: []
  })),
  on(loadProductsByCategorySuccess, (state, action) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    products: action.products
  })),
  on(loadProductsByCategoryFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  }))
);

export const productsReducer = (state: ProductsState, action: any) =>
  productsReduce(state, action);
