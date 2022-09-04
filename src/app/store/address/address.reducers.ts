import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { clearAddress, clearZipCodeSearch, getDeliveryPrice, getDeliveryPriceFail, getDeliveryPriceSuccess, searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';
import { AddressState } from './address.state';

const initialState: AddressState = appInitialState.address;

const _addressReducer = createReducer(
  initialState,
  on(searchByZipCode, (state) => ({
    ...state,
    address: undefined,
    error: undefined,
    isLoaded: false,
    isLoading: true
  })),
  on(searchByZipCodeSuccess, (state, action) => ({
    ...state,
    address: action.address,
    isLoaded: true,
    isLoading: false
  })),
  on(searchByZipCodeFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  })),
  on(clearZipCodeSearch, (state) => ({
    ...state,
    isLoaded: false,
    isLoading: false
  })),
  on(getDeliveryPrice, (state) => ({
    ...state,
    deliveryPrice: undefined,
    error: undefined,
    isGettingDeliveryPrice: true,
    isGotDeliveryPrice: false
  })),
  on(getDeliveryPriceSuccess, (state, action) => ({
    ...state,
    deliveryPrice: action.deliveryPrice,
    isGettingDeliveryPrice: false,
    isGotDeliveryPrice: true
  })),
  on(getDeliveryPriceFail, (state, action) => ({
    ...state,
    error: action.error,
    isGettingDeliveryPrice: false,
    isGotDeliveryPrice: false
  })),
  on(clearAddress, () => ({
    ...initialState
  }))
);

export function addressReducer(state: AddressState, action: any): AddressState {
  return _addressReducer(state, action);
}
