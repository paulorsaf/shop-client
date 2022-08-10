import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserRegister } from 'src/app/model/user/user-register';
import { AuthService } from 'src/app/services/auth/auth.service';
import { login } from '../login/login.actions';
import { register, registerFail, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((params: {userRegister: UserRegister}) =>
        this.authService.register(params.userRegister).pipe(
          map(() => registerSuccess({userRegister: params.userRegister})),
          catchError(error => of(registerFail({error})))
        )
      )
    )
  );

  registerSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccess),
      switchMap((params: {userRegister: UserRegister}) =>
        of(login({
          email: params.userRegister.email,
          password: params.userRegister.password
        }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
