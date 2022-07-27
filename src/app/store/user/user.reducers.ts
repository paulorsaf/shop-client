import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { logout, logoutFail, logoutSuccess, setUser } from './user.actions';
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
    error: null,
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
  }))
);

export function userReducer(state: UserState, action: any): UserState {
  return _userReducer(state, action);
}
