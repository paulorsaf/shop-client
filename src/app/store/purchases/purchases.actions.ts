import { createAction, props } from "@ngrx/store";
import { Purchase } from "src/app/model/purchase/purchase";

export const loadPurchases = createAction('[Purchases] load');
export const loadPurchasesSuccess = createAction('[Purchases] load success', props<{purchases: Purchase[]}>());
export const loadPurchasesFail = createAction('[Purchases] load fail', props<{error: any}>());