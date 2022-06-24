import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadBanners, loadBannersFail, loadBannersSuccess } from './banner.actions';
import { BannerState } from './banner.state';

const initialState: BannerState = appInitialState.banner;

const _bannerReducer = createReducer(
  initialState,
  on(loadBanners, (state) => {
    return {
      ...state,
      banners: [],
      error: null,
      isLoaded: false,
      isLoading: true
    };
  }),
  on(loadBannersSuccess, (state, action) => {
    return {
      ...state,
      banners: action.banners,
      isLoaded: true,
      isLoading: false
    };
  }),
  on(loadBannersFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoaded: false,
      isLoading: false
    };
  })
);

export function bannerReducer(state: BannerState, action: any): BannerState {
  return _bannerReducer(state, action);
}
