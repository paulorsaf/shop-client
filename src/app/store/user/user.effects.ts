import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { loginUserByToken, loginUserByTokenFail, loginUserByTokenSuccess, logout, logoutFail, logoutSuccess, setUser } from './user.actions';

@Injectable()
export class UserEffects {

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => logoutSuccess()),
          catchError(error => of(logoutFail({error})))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutSuccess),
      switchMap(() => of(setUser({user: null})))
    )
  );

  loginUserByTokenEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserByToken),
      switchMap(() =>
        this.authService.loginByToken().pipe(
          map(user => loginUserByTokenSuccess({user})),
          catchError(error => of(loginUserByTokenFail()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
