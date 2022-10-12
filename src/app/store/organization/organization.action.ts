import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/model/company/company";

export const loadOrganizationCompanies = createAction('[Organization] load');
export const loadOrganizationCompaniesSuccess = createAction('[Organization] load success', props<{companies: Company[]}>());
export const loadOrganizationCompaniesFail = createAction('[Organization] load fail', props<{error: any}>());

export const setSelectedCompany = createAction('[Organization] set selected company', props<{company: Company}>());