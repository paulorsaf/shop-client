import { actionSheetController } from '@ionic/core';
import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../app-initial-state';
import { TrendingState } from './trending-state';
import { loadTrendings, loadTrendingsFail, loadTrendingsSuccess } from './trending.actions';

const initialState: TrendingState = AppInitialState.trending;

const _trendingReducer = createReducer(
  initialState,
  on(loadTrendings, (state) => {
    return {
      ...state,
      error: null,
      isLoaded: false,
      isLoading: true,
      trendings: []
    };
  }),
  on(loadTrendingsSuccess, (state, action) => {
    return {
      ...state,
      isLoaded: true,
      isLoading: false,
      trendings: action.trendings
    };
  }),
  on(loadTrendingsFail, (state, action) => {
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
