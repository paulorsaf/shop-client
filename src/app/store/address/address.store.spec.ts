import { appInitialState } from "../app-initial-state";
import { clearAddress, clearZipCodeSearch, getDeliveryPrice, getDeliveryPriceFail, getDeliveryPriceSuccess, searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from "./address.actions";
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

    it('clearZipCodeSearch', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            address: {} as any,
            isLoaded: true,
            isLoading: false
        }

        const newState = addressReducer(initialState, clearZipCodeSearch());

        expect(newState).toEqual({
            ...appInitialState.address,
            address: {} as any,
            isLoaded: false,
            isLoading: false
        })
    })

    it('getDeliveryPrice', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            error: {},
            deliveryPrice: 10,
            isGettingDeliveryPrice: false,
            isGotDeliveryPrice: true
        }

        const newState = addressReducer(initialState, getDeliveryPrice({zipCode: "anyZipCode"}));

        expect(newState).toEqual({
            ...appInitialState.address,
            error: undefined,
            deliveryPrice: undefined,
            isGettingDeliveryPrice: true,
            isGotDeliveryPrice: false
        })
    })

    it('getDeliveryPriceSuccess', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            isGettingDeliveryPrice: true
        }

        const newState = addressReducer(initialState, getDeliveryPriceSuccess({deliveryPrice: 10}));

        expect(newState).toEqual({
            ...appInitialState.address,
            deliveryPrice: 10,
            isGettingDeliveryPrice: false,
            isGotDeliveryPrice: true
        })
    })

    it('getDeliveryPriceFail', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            isGettingDeliveryPrice: true
        }

        const error = {error: "error"};
        const newState = addressReducer(initialState, getDeliveryPriceFail({error}));

        expect(newState).toEqual({
            ...appInitialState.address,
            error,
            isGettingDeliveryPrice: false,
            isGotDeliveryPrice: false
        })
    })

    it('getDeliveryPriceFail', () => {
        const initialState: AddressState = {
            ...appInitialState.address,
            address: {} as any,
            deliveryPrice: 0,
            error: {},
            isGettingDeliveryPrice: true,
            isGotDeliveryPrice: true,
            isLoaded: true,
            isLoading: true
        }

        const newState = addressReducer(initialState, clearAddress());

        expect(newState).toEqual({
            ...appInitialState.address
        })
    })

})