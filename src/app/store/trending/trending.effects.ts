import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { loadTrendings, loadTrendingsFail, loadTrendingsSuccess } from './trending.actions';

@Injectable()
export class TrendingEffects {

  constructor(
    private actions$: Actions,
    private trendingService: TrendingService
  ) {}

  loadTrendingsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrendings),
      switchMap(() => this.trendingService.findAll().pipe(
        map(trendings => loadTrendingsSuccess({trendings})),
        catchError(error => of(loadTrendingsFail({error})))
      ))
    )
  );

}
