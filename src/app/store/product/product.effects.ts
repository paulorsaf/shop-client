import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
import { loadProduct, loadProductFail, loadProductSuccess } from './product.actions';

@Injectable()
export class ProductEffects {

  loadProductEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      switchMap((params: {id: string}) =>
        this.productService.findById(params.id).pipe(
          map(product => loadProductSuccess({product})),
          catchError(error => of(loadProductFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

}
