import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { setUser } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = appInitialState.user;

const _userReducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({
    ...state,
    user: action.user
  }))
);

export function userReducer(state: UserState, action: any): UserState {
  return _userReducer(state, action);
}
