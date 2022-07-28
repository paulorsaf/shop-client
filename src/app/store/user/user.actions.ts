import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const setUser = createAction('[User] set', props<{user: User}>());

export const logout = createAction('[User] logout');
export const logoutSuccess = createAction('[User] logout success');
export const logoutFail = createAction('[User] logout fail', props<{error: any}>());

export const loginUserByToken = createAction('[User] find logged user');
export const loginUserByTokenSuccess = createAction('[User] find logged user success', props<{user: User}>());
export const loginUserByTokenFail = createAction('[User] find logged user fail');