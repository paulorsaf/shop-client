import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { loadCompany, loadCompanyFail, loadCompanySuccess } from './company.action';
import { CompanyState } from './company.state';

const initialState: CompanyState = appInitialState.company;

const _companyReducer = createReducer(
  initialState,
  on(loadCompany, (state) => ({
    ...state,
    company: null,
    error: null,
    isLoaded: false,
    isLoading: true
  })),
  on(loadCompanySuccess, (state, action) => ({
    ...state,
    company: action.company,
    isLoaded: true,
    isLoading: false
  })),
  on(loadCompanyFail, (state, action) => ({
    ...state,
    error: action.error,
    isLoaded: false,
    isLoading: false
  }))
);

export function companyReducer(state: CompanyState, action: any): CompanyState {
  return _companyReducer(state, action);
}
