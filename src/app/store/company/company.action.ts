import { createAction, props } from "@ngrx/store";
import { Company } from "src/app/model/company/company";

export const loadCompany = createAction('[Company] load');
export const loadCompanySuccess = createAction('[Company] load success', props<{company: Company}>());
export const loadCompanyFail = createAction('[Company] load fail', props<{error: any}>());