import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/model/address/address";

export const searchByZipCode = createAction('[Address] search by zip code', props<{zipCode: string}>());
export const searchByZipCodeSuccess = createAction('[Login] search by zip code success', props<{address: Address}>());
export const searchByZipCodeFail = createAction('[Login] search by zip code fail', props<{error: any}>());