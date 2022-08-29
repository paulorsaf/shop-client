import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { loadPurchaseDetail, loadPurchaseDetailFail, loadPurchaseDetailSuccess } from './purchase-detail.action';

@Injectable()
export class PurchaseDetailEffects {

  loadPurchasesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPurchaseDetail),
      switchMap((params: {id: string}) =>
        this.purchaseService.findById(params.id).pipe(
          map(purchase => loadPurchaseDetailSuccess({purchase})),
          catchError(error => of(loadPurchaseDetailFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService
  ) {}

}
