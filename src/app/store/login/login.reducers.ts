import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';
import { LoginState } from './login.state';

const initialState: LoginState = appInitialState.login;

const _loginReducer = createReducer(
  initialState,
  on(recoverPassword, (state) => ({
    ...state,
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isRecoveredPassword: false,
    isRecoveringPassword: true
  })),
  on(recoverPasswordSuccess, (state) => ({
    ...state,
    isRecoveredPassword: true,
    isRecoveringPassword: false
  })),
  on(recoverPasswordFail, (state, action) => ({
    ...state,
    error: action.error,
    isRecoveredPassword: false,
    isRecoveringPassword: false
  })),
  on(login, (state) => ({
    ...state,
    error: null,
    isLoggedIn: false,
    isLoggingIn: true,
    isRecoveredPassword: false,
    isRecoveringPassword: false
  })),
  on(loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    isLoggingIn: false
  })),
  on(loginFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoggedIn: false,
    isLoggingIn: false
  }))
);

export function loginReducer(state: LoginState, action: any): LoginState {
  return _loginReducer(state, action);
}
