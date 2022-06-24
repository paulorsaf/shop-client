import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction('[Categories] load');
export const loadCategoriesSuccess = createAction('[Categories] load success', props<{categories: any[]}>());
export const loadCategoriesFail = createAction('[Categories] load fail', props<{error: any}>());
