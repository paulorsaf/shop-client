import { createAction, props } from "@ngrx/store";

export const loadTrendingss = createAction('[Trendings] load');
export const loadTrendingssSuccess = createAction('[Trendings] load success', props<{trendings: any[]}>());
export const loadTrendingssFail = createAction('[Trendings] load fail', props<{error: any}>());