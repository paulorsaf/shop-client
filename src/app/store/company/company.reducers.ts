import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadCompany, loadCompanyById, loadCompanyByIdFail, loadCompanyByIdSuccess, loadCompanyFail, loadCompanySuccess } from './company.action';
import { CompanyState } from './company.state';

const initialState: CompanyState = appInitialState.company;

const _companyReducer = createReducer(
  initialState,
  on(loadCompany, (state) => ({
    ...state,
    company: undefined,
    error: undefined,
    isLoaded: false,
    isLoading: true,
    selectedCompany: undefined
  })),
  on(loadCompanySuccess, (state, action) => ({
    ...state,
    company: action.company,
    isLoaded: true,
    isLoading: false,
    selectedCompany: action.company
  })),
  on(loadCompanyFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  })),
  on(loadCompanyById, (state) => ({
    ...state,
    error: undefined,
    isLoadedById: false,
    isLoadingById: true,
    selectedCompany: undefined
  })),
  on(loadCompanyByIdSuccess, (state, action) => ({
    ...state,
    isLoadedById: true,
    isLoadingById: false,
    selectedCompany: action.company
  })),
  on(loadCompanyByIdFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoadedById: false,
    isLoadingById: false
  }))
);

export function companyReducer(state: CompanyState, action: any): CompanyState {
  return _companyReducer(state, action);
}
