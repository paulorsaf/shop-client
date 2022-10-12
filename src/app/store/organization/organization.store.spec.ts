import { appInitialState } from "../app-initial-state";
import { loadOrganizationCompanies, loadOrganizationCompaniesFail, loadOrganizationCompaniesSuccess, setSelectedCompany } from "./organization.action";
import { organizationReducer } from "./organization.reducers";
import { OrganizationState } from "./organization.state";

describe('Organization store', () => {

    it('loadOrganizationCompanies', () => {
        const initialState: OrganizationState = {
            ...appInitialState.organization,
            error: {},
            isLoaded: true,
            isLoading: true,
            companies: [{}] as any,
            selectedCompany: {} as any
        }

        const newState = organizationReducer(initialState, loadOrganizationCompanies());

        expect(newState).toEqual({
            ...appInitialState.organization,
            error: undefined,
            isLoaded: false,
            isLoading: true,
            companies: [],
            selectedCompany: undefined
        })
    })

    describe('given loadOrganizationCompaniesSuccess', () => {

        const initialState: OrganizationState = {
            ...appInitialState.organization,
            isLoading: true
        }

        it('when only one company loaded, then set company as the selected company', () => {
    
            const companies = [{id: 1}] as any
            const newState = organizationReducer(initialState, loadOrganizationCompaniesSuccess({companies}));
    
            expect(newState).toEqual({
                ...appInitialState.organization,
                companies,
                isLoaded: true,
                isLoading: false,
                selectedCompany: {id: 1} as any
            })
        })

        it('when multiple companies loaded, then set undefined as the selected company', () => {
            const companies = [{id: 1}, {id: 2}] as any
            const newState = organizationReducer(initialState, loadOrganizationCompaniesSuccess({companies}));
    
            expect(newState).toEqual({
                ...appInitialState.organization,
                companies,
                isLoaded: true,
                isLoading: false,
                selectedCompany: undefined
            })
        })

    })

    it('loadCompanyFail', () => {
        const initialState: OrganizationState = {
            ...appInitialState.organization,
            isLoading: true
        }

        const error = {error: "error"};
        const newState = organizationReducer(initialState, loadOrganizationCompaniesFail({error}));

        expect(newState).toEqual({
            ...appInitialState.organization,
            error,
            isLoaded: false,
            isLoading: false
        })
    })

    it('setSelectedCompany', () => {
        const initialState: OrganizationState = {
            ...appInitialState.organization
        }

        const company = {id: 1} as any;
        const newState = organizationReducer(initialState, setSelectedCompany({company}));

        expect(newState).toEqual({
            ...appInitialState.organization,
            selectedCompany: company
        })
    })

})