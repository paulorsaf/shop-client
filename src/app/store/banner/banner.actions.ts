import { createAction, props } from "@ngrx/store";

export const loadBanners = createAction('[Banners] load');
export const loadBannersSuccess = createAction('[Banners] load success', props<{banners: any[]}>());
export const loadBannersFail = createAction('[Banners] load fail', props<{error: any}>());