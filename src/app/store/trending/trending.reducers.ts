import { actionSheetController } from '@ionic/core';
import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { TrendingState } from './trending-state';
import { loadTrendingss, loadTrendingssFail, loadTrendingssSuccess } from './trending.actions';

const initialState: TrendingState = appInitialState.trending;

const _trendingReducer = createReducer(
  initialState,
  on(loadTrendingss, (state) => {
    return {
      ...state,
      error: undefined,
      isLoaded: false,
      isLoading: true,
      trendings: []
    };
  }),
  on(loadTrendingssSuccess, (state, action) => {
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      trendings: action.trendings
    };
  }),
  on(loadTrendingssFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoaded: false,
      isLoading: false
    };
  })
);

export function trendingReducer(state: TrendingState, action: any): TrendingState {
  return _trendingReducer(state, action);
}
