import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";

export const searchByZipCode = createAction('[Address] search by zip code', props<{zipCode: string}>());
export const searchByZipCodeSuccess = createAction('[Address] search by zip code success', props<{address: Address}>());
export const searchByZipCodeFail = createAction('[Address] search by zip code fail', props<{error: any}>());

export const clearZipCodeSearch = createAction('[Address] clear zip code search');

export const clearAddress = createAction('[Address] clear');

export const getDeliveryPrice = createAction('[Address] get delivery price', props<{zipCode: string}>());
export const getDeliveryPriceSuccess = createAction('[Address] get delivery price success', props<{deliveryPrice: number}>());
export const getDeliveryPriceFail = createAction('[Address] get delivery price fail', props<{error: any}>());