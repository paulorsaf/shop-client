import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadOrganizationCompanies, loadOrganizationCompaniesFail, loadOrganizationCompaniesSuccess, setSelectedCompany } from './organization.action';
import { OrganizationState } from './organization.state';

const initialState: OrganizationState = appInitialState.organization;

const _organizationReducer = createReducer(
  initialState,
  on(loadOrganizationCompanies, (state) => ({
    ...state,
    companies: [],
    error: undefined,
    isLoaded: false,
    isLoading: true,
    selectedCompany: undefined
  })),
  on(loadOrganizationCompaniesSuccess, (state, action) => ({
    ...state,
    companies: action.companies,
    isLoaded: true,
    isLoading: false,
    selectedCompany: action.companies?.length === 1 ? action.companies[0] : undefined
  })),
  on(loadOrganizationCompaniesFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  })),
  on(setSelectedCompany, (state, action) => ({
    ...state,
    selectedCompany: action.company
  }))
);

export function organizationReducer(state: OrganizationState, action: any): OrganizationState {
  return _organizationReducer(state, action);
}
