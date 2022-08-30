import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loginUserByToken, loginUserByTokenFail, loginUserByTokenSuccess, logout, logoutFail, logoutSuccess, setUser } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = appInitialState.user;

const _userReducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({
    ...state,
    user: action.user
  })),
  on(logout, (state) => ({
    ...state,
    error: undefined,
    isLoggedOut: false,
    isLoggingOut: true
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    isLoggedOut: true,
    isLoggingOut: false
  })),
  on(logoutFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoggedOut: false,
    isLoggingOut: false
  })),
  on(loginUserByToken, (state) => ({
    ...state,
    user: undefined,
    isLoggedInByToken: false,
    isLoggingInByToken: true
  })),
  on(loginUserByTokenSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoggedInByToken: true,
    isLoggingInByToken: false
  })),
  on(loginUserByTokenFail, (state) => ({
    ...state,
    user: undefined,
    isLoggedInByToken: true,
    isLoggingInByToken: false
  }))
);

export function userReducer(state: UserState, action: any): UserState {
  return _userReducer(state, action);
}
