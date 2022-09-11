import { createAction, props } from "@ngrx/store";
import { CreditCard } from "src/app/model/payment/credit-card";

export const loadCreditCards = createAction('[Credit cards] load');
export const loadCreditCardsSuccess = createAction('[Credit cards] load success', props<{creditCards: CreditCard[]}>());
export const loadCreditCardsFail = createAction('[Credit cards] load fail', props<{error: any}>());

export const deleteCreditCard = createAction('[Credit cards] delete', props<{id: string}>());
export const deleteCreditCardSuccess = createAction('[Credit cards] delete success');
export const deleteCreditCardFail = createAction('[Credit cards] delete fail', props<{error: any}>());