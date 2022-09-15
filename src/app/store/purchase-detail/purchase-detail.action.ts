import { createAction, props } from "@ngrx/store";
import { Purchase } from "src/app/model/purchase/purchase";

export const loadPurchaseDetail = createAction('[Purchase detail] load', props<{id: string}>());
export const loadPurchaseDetailSuccess = createAction('[Purchase detail] load success', props<{purchase: Purchase}>());
export const loadPurchaseDetailFail = createAction('[Purchase detail] load fail', props<{error: any}>());

export const clearPurchaseDetail = createAction('[Purchase detail] clear');