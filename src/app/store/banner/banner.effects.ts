import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BannersService } from 'src/app/services/banners/banners.service';
import { loadBanners, loadBannersFail, loadBannersSuccess } from './banner.actions';

@Injectable()
export class BannerEffects {

  constructor(
    private actions$: Actions,
    private bannersService: BannersService
  ) {}

  loadBannersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBanners),
      switchMap(() => this.bannersService.findAll().pipe(
        map(banners => loadBannersSuccess({banners})),
        catchError(error => of(loadBannersFail({error})))
      ))
    )
  );

}
