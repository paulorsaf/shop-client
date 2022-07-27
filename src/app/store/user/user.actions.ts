import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user";

export const setUser = createAction('[User] set', props<{user: User}>());