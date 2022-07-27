import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const recoverPassword = createAction('[Login] recover password', props<{email: string}>());
export const recoverPasswordSuccess = createAction('[Login] recover password success');
export const recoverPasswordFail = createAction('[Login] recover password fail', props<{error: any}>());

export const login = createAction('[Login] login', props<{email: string, password: string}>());
export const loginSuccess = createAction('[Login] login success', props<{user: User}>());
export const loginFail = createAction('[Login] login fail', props<{error: any}>());