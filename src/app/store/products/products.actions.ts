import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product/product';

export const loadProductsByCategory = createAction(
    '[Product] load products by category', props<{id: string}>()
);
export const loadProductsByCategorySuccess = createAction(
    '[Product] load products by category success', props<{products: Product[]}>()
);
export const loadProductsByCategoryFail = createAction(
    '[Product] load products by category fail', props<{error: any}>()
);
