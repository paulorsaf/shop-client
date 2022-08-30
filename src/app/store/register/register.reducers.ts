import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { register, registerFail, registerSuccess } from './register.actions';
import { RegisterState } from './register.state';

const initialState: RegisterState = appInitialState.register;

const _registerReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    error: undefined,
    isRegistered: false,
    isRegistering: true
  })),
  on(registerSuccess, (state) => ({
    ...state,
    isRegistered: true,
    isRegistering: false
  })),
  on(registerFail, (state, action) => ({
    ...state,
    error: action.error,
    isRegistered: false,
    isRegistering: false
  }))
);

export const registerReducer = (state: RegisterState, action: any) =>
  _registerReducer(state, action);
