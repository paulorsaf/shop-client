import { appInitialState } from "../app-initial-state";
import { searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from "./address.actions";
import { addressReducer } from "./address.reducers";
import { AddressState } from "./address.state";

describe('Address store', () => {

    it('searchByZipCode', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            error: {},
            address: {} as any,
            isLoaded: true,
            isLoading: false
        }

        const newState = addressReducer(initialState, searchByZipCode({zipCode: "anyZipCode"}));

        expect(newState).toEqual({
            ...appInitialState.address,
            error: undefined,
            address: undefined,
            isLoaded: false,
            isLoading: true
        })
    })

    it('searchByZipCodeSuccess', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            isLoading: true
        }

        const address = {street: "anyStreet"} as any;
        const newState = addressReducer(initialState, searchByZipCodeSuccess({address}));

        expect(newState).toEqual({
            ...appInitialState.address,
            address,
            isLoaded: true,
            isLoading: false
        })
    })

    it('searchByZipCodeFail', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = addressReducer(initialState, searchByZipCodeFail({error}));

        expect(newState).toEqual({
            ...appInitialState.address,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})