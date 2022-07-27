import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { loadTrendingss, loadTrendingssFail, loadTrendingssSuccess } from './trending.actions';

@Injectable()
export class TrendingEffects {

  constructor(
    private actions$: Actions,
    private trendingService: TrendingService
  ) {}

  loadTrendingssEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrendingss),
      switchMap(() => this.trendingService.findAll().pipe(
        map(trendings => loadTrendingssSuccess({trendings})),
        catchError(error => of(loadTrendingssFail({error})))
      ))
    )
  );

}
