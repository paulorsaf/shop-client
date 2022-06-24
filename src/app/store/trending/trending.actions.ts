import { createAction, props } from "@ngrx/store";

export const loadTrendings = createAction('[Trendings] load');
export const loadTrendingsSuccess = createAction('[Trendings] load success', props<{trendings: any[]}>());
export const loadTrendingsFail = createAction('[Trendings] load fail', props<{error: any}>());