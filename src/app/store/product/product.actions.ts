import { createAction, props } from '@ngrx/store';

export const loadProduct = createAction('[Product] load', props<{id: string}>());
export const loadProductSuccess = createAction('[Product] load success', props<{product: any}>());
export const loadProductFail = createAction('[Product] load fail', props<{error: any}>());

export const setSelectedColor = createAction('[Product] select color', props<{color: string}>());
export const setSelectedSize = createAction('[Product] select size', props<{size: string}>());