import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/model/company/company";

export const loadCompany = createAction('[Company] load');
export const loadCompanySuccess = createAction('[Company] load success', props<{company: Company}>());
export const loadCompanyFail = createAction('[Company] load fail', props<{error: any}>());

export const loadCompanyById = createAction('[Company] load by id', props<{id: string}>());
export const loadCompanyByIdSuccess = createAction('[Company] load by id success', props<{company: Company}>());
export const loadCompanyByIdFail = createAction('[Company] load by id fail', props<{error: any}>());