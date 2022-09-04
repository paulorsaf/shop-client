import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { ProductState } from './product.state';
import { clearProduct, loadProduct, loadProductFail, loadProductSuccess, setSelectedColor, setSelectedSize } from './product.actions';

const initialState: ProductState = appInitialState.product;

const productReduce = createReducer(
  initialState,
  on(loadProduct, (state) => ({
    ...state,
    error: undefined,
    isLoaded: false,
    isLoading: true,
    product: undefined
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
  })),
  on(setSelectedColor, (state, action) => ({
    ...state,
    selectedColor: action.color
  })),
  on(setSelectedSize, (state, action) => ({
    ...state,
    selectedColor: undefined,
    selectedSize: action.size
  })),
  on(clearProduct, () => ({
    ...initialState
  }))
);

export const productReducer = (state: ProductState, action: any) =>
  productReduce(state, action);
