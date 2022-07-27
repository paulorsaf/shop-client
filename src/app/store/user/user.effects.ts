import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { logout, logoutFail, logoutSuccess } from './user.actions';

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

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
