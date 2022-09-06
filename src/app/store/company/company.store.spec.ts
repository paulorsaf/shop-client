import { appInitialState } from "../app-initial-state";
import { loadCompany, loadCompanyById, loadCompanyByIdFail, loadCompanyByIdSuccess, loadCompanyFail, loadCompanySuccess } from "./company.action";
import { companyReducer } from "./company.reducers";
import { CompanyState } from "./company.state";

describe('Company store', () => {

    it('loadCompany', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            error: {},
            isLoaded: true,
            isLoading: true,
            company: {} as any,
            selectedCompany: {} as any
        }

        const newState = companyReducer(initialState, loadCompany());

        expect(newState).toEqual({
            ...appInitialState.company,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            company: undefined,
            selectedCompany: undefined
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
            isLoading: false,
            selectedCompany: company
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

    it('loadCompanyById', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            error: {},
            isLoadedById: true,
            isLoadingById: true,
            selectedCompany: {} as any
        }

        const newState = companyReducer(initialState, loadCompanyById({id: "anyId"}));

        expect(newState).toEqual({
            ...appInitialState.company,
            error: undefined,
            isLoadedById: false,
            isLoadingById: true,
            selectedCompany: undefined
        })
    })

    it('loadCompanyByIdSuccess', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            isLoadingById: true
        }

        const company = {id: 1} as any
        const newState = companyReducer(initialState, loadCompanyByIdSuccess({company}));

        expect(newState).toEqual({
            ...appInitialState.company,
            isLoadedById: true,
            isLoadingById: false,
            selectedCompany: company
        })
    })

    it('loadCompanyByIdFail', () => {
        const initialState: CompanyState = {
            ...appInitialState.company,
            isLoadingById: true
        }

        const error = {error: "error"};
        const newState = companyReducer(initialState, loadCompanyByIdFail({error}));

        expect(newState).toEqual({
            ...appInitialState.company,
            error,
            isLoadedById: false,
            isLoadingById: false,
        })
    })

})