import { createAction, props } from "@ngrx/store";
import { CalculatePrice, CalculatePriceResponse } from "src/app/model/purchase/calculate-price";
import { Purchase } from "src/app/model/purchase/purchase";

export const loadPurchases = createAction('[Purchases] load');
export const loadPurchasesSuccess = createAction('[Purchases] load success', props<{purchases: Purchase[]}>());
export const loadPurchasesFail = createAction('[Purchases] load fail', props<{error: any}>());

export const calculatePurchasePrice = createAction('[Purchases] calculate price', props<{calculate: CalculatePrice}>());
export const calculatePurchasePriceSuccess = createAction('[Purchases] calculate price success', props<{price: CalculatePriceResponse}>());
export const calculatePurchasePriceFail = createAction('[Purchases] calculate price fail', props<{error: any}>());