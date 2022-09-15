import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, } from 'rxjs/operators';
import { PurchaseService } from 'src/app/services/purchase/purchase.service';
import { AppState } from '../app-state';
import { loadLastPurchase, loadLastPurchaseFail, loadLastPurchaseSuccess, loadPaymentPurchaseById, loadPaymentPurchaseByIdFail, loadPaymentPurchaseByIdSuccess, loadPurchases, loadPurchasesFail, loadPurchasesSuccess } from './purchases.actions';

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

  loadLastPurchaseEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLastPurchase),
      switchMap(() =>
        this.purchaseService.findLastPurchase().pipe(
          map(purchase => loadLastPurchaseSuccess({purchase})),
          catchError(error => of(loadLastPurchaseFail({error}))),
        )
      )
    )
  );

  loadPaymentPurchaseByIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPaymentPurchaseById),
      this.getStore(),
      switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
        this.purchaseService.findPaymentPurchase(
          storeState.purchaseDetail?.purchase?.id
        ).pipe(
          map(purchase => loadPaymentPurchaseByIdSuccess({purchase})),
          catchError(error => of(loadPaymentPurchaseByIdFail({error}))),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private purchaseService: PurchaseService,
    private store: Store<AppState>
  ) {}

  getStore(){
    return withLatestFrom(this.store);
  }

}
