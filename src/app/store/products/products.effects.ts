import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap, } from 'rxjs/operators';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { ProductService } from 'src/app/services/product/product.service';
import { AppState } from '../app-state';
import { loadProductsByCategory, loadProductsByCategoryFail, loadProductsByCategorySuccess } from './products.actions';

@Injectable()
export class ProductsEffects {

  loadProductsByCategoryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      switchMap((params: {id: string}) =>
        this.productService.findByCategory(params.id).pipe(
          map(products => loadProductsByCategorySuccess({products})),
          catchError(error => of(loadProductsByCategoryFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

}
