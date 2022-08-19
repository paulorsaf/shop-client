import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';

@Injectable()
export class PurchasesEffects {

  loadPurchasesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPurchases),
      switchMap(() =>
        this.purchaseService.findAll().pipe(
          map(purchases => loadPurchasesSuccess({purchases})),
          catchError(error => of(loadPurchasesFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService
  ) {}

}
