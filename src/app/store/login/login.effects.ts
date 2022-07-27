import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { setUser } from '../user/user.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from './login.actions';

@Injectable()
export class LoginEffects {

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((params: {email: string, password: string}) =>
        this.authService.login(params.email, params.password).pipe(
          map(user => loginSuccess({user})),
          catchError(error => of(loginFail({error})))
        )
      )
    )
  );

  loginSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      switchMap((params: {user: User}) => of(setUser({user: params.user})))
    )
  );

  recoverPasswordEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recoverPassword),
      switchMap((params: {email: string}) =>
        this.authService.recoverPassword(params.email).pipe(
          map(() => recoverPasswordSuccess()),
          catchError(error => of(recoverPasswordFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
