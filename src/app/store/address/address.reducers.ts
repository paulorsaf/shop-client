import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';
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
  }))
);

export function addressReducer(state: AddressState, action: any): AddressState {
  return _addressReducer(state, action);
}
