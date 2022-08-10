import { createAction, props } from "@ngrx/store";
import { UserRegister } from "src/app/model/user/user-register";

export const register = createAction('[Register] register', props<{userRegister: UserRegister}>());
export const registerSuccess = createAction('[Register] register success', props<{userRegister: UserRegister}>());
export const registerFail = createAction('[Register] register fail', props<{error: any}>());