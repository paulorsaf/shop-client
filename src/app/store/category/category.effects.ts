import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category/category.service';
import { loadCategories, loadCategoriesFail, loadCategoriesSuccess } from './category.actions';

@Injectable()
export class CategoryEffects {

  loadCategoriesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      switchMap(() => this.categoryService.findAll().pipe(
        map(categories => loadCategoriesSuccess({categories})),
        catchError(error => of(loadCategoriesFail({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

}
