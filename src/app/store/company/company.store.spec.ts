import { appInitialState } from "../app-initial-state";
import { loadCompany, loadCompanyFail, loadCompanySuccess } from "./company.action";
import { companyReducer } from "./company.reducers";
import { CompanyState } from "./company.state";

describe('Company store', () => {

    it('loadCompany', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            error: {},
            isLoaded: true,
            isLoading: true,
            company: {} as any
        }

        const newState = companyReducer(initialState, loadCompany());

        expect(newState).toEqual({
            ...appInitialState.company,
            error: null,
            isLoaded: false,
            isLoading: true,
            company: null
        })
    })

    it('loadCompanySuccess', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            isLoading: true
        }

        const company = {id: 1} as any
        const newState = companyReducer(initialState, loadCompanySuccess({company}));

        expect(newState).toEqual({
            ...appInitialState.company,
            company,
            isLoaded: true,
            isLoading: false
        })
    })

    it('loadCompanyFail', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = companyReducer(initialState, loadCompanyFail({error}));

        expect(newState).toEqual({
            ...appInitialState.company,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

})