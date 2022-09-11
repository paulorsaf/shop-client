import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { deleteCreditCard, deleteCreditCardFail, deleteCreditCardSuccess, loadCreditCards, loadCreditCardsFail, loadCreditCardsSuccess } from './credit-cards.actions';
import { CreditCardsState } from './credit-cards.state';

const initialState: CreditCardsState = appInitialState.creditCards;

const _creditCardsReducer = createReducer(
  initialState,
  on(loadCreditCards, (state) => ({
    ...state,
    creditCards: [],
    error: undefined,
    isDeleted: false,
    isDeleting: false,
    isLoaded: false,
    isLoading: true
  })),
  on(loadCreditCardsSuccess, (state, action) => ({
    ...state,
    creditCards: action.creditCards,
    isLoaded: true,
    isLoading: false
  })),
  on(loadCreditCardsFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  })),
  on(deleteCreditCard, (state) => ({
    ...state,
    error: undefined,
    isDeleted: false,
    isDeleting: true
  })),
  on(deleteCreditCardSuccess, (state) => ({
    ...state,
    isDeleted: true,
    isDeleting: false
  })),
  on(deleteCreditCardFail, (state, action) => ({
    ...state,
    error: action.error,
    isDeleted: false,
    isDeleting: false
  }))
);

export function creditCardsReducer(state: CreditCardsState, action: any): CreditCardsState {
  return _creditCardsReducer(state, action);
}
