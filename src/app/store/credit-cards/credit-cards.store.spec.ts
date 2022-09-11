import { appInitialState } from "../app-initial-state";
import { deleteCreditCard, deleteCreditCardFail, deleteCreditCardSuccess, loadCreditCards, loadCreditCardsFail, loadCreditCardsSuccess } from "./credit-cards.actions";
import { creditCardsReducer } from "./credit-cards.reducers";
import { CreditCardsState } from "./credit-cards.state";

describe('Credit cards store', () => {

    it('loadCreditCards', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            error: {},
            creditCards: [{} as any],
            isDeleted: true,
            isDeleting: true,
            isLoaded: true,
            isLoading: false
        }

        const newState = creditCardsReducer(initialState, loadCreditCards());

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            error: undefined,
            creditCards: [],
            isDeleted: false,
            isDeleting: false,
            isLoaded: false,
            isLoading: true
        })
    })

    it('loadCreditCardsSuccess', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            isLoading: true
        }

        const creditCards = [{id: 1}] as any;
        const newState = creditCardsReducer(initialState, loadCreditCardsSuccess({creditCards}));

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            creditCards,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadCreditCardsFail', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = creditCardsReducer(initialState, loadCreditCardsFail({error}));

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

    it('deleteCreditCard', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            error: {},
            isDeleted: true,
            isDeleting: false
        }

        const newState = creditCardsReducer(initialState, deleteCreditCard({id: "anyId"}));

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            error: undefined,
            isDeleted: false,
            isDeleting: true
        })
    })

    it('deleteCreditCardSuccess', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            isDeleting: true
        }

        const newState = creditCardsReducer(initialState, deleteCreditCardSuccess());

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            isDeleted: true,
            isDeleting: false
        })
    })

    it('deleteCreditCardFail', () => {
        const initialState: CreditCardsState = {
            ...appInitialState.creditCards,
            isDeleting: true
        }

        const error = {error: "error"};
        const newState = creditCardsReducer(initialState, deleteCreditCardFail({error}));

        expect(newState).toEqual({
            ...appInitialState.creditCards,
            error,
            isDeleted: false,
            isDeleting: false
        })
    })

})