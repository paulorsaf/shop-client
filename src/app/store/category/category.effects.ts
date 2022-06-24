import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from './category.actions';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  loadCategoriesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      switchMap(() => this.categoryService.findAll().pipe(
        map(categories => loadCategoriesSuccess({categories})),
        catchError(error => of(loadCategoriesFail({error})))
      ))
    )
  );

}
