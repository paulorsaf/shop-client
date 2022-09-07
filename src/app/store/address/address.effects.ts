import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { AddressService } from 'src/app/services/address/address.service';
import { AppState } from '../app-state';
import { clearZipCodeSearch, getDeliveryPrice, getDeliveryPriceFail, getDeliveryPriceSuccess, searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';

@Injectable()
export class AddressEffects {

  searchByZipCodeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchByZipCode),
      switchMap((params: {zipCode: string}) =>
        this.addressService.findByZipCode(params.zipCode).pipe(
          map(address => searchByZipCodeSuccess({address})),
          catchError(error => of(searchByZipCodeFail({error})))
        )
      )
    )
  );

  searchByZipCodeSuccessClearZipCodeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchByZipCodeSuccess),
      switchMap(() => of(clearZipCodeSearch()))
    )
  );

  searchByZipCodeSuccessGetDeliveryPriceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchByZipCodeSuccess),
      switchMap((params: {address: Address}) =>
        of(getDeliveryPrice({zipCode: params.address.zipCode}))
      )
    )
  );

  getDeliveryPriceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDeliveryPrice),
      this.getStore(),
      switchMap(([action, storeState]: [action: any, storeState: AppState]) => 
        this.addressService.findDeliveryPrice(
          action.zipCode, storeState.shoppingCart?.products?.map(p => ({
            amount: p.amount || 1, weight: p.product.weight
          }))
        ).pipe(
          map(deliveryPrice => getDeliveryPriceSuccess({deliveryPrice})),
          catchError(error => of(getDeliveryPriceFail({error})))
        )
      )
    )
  );

  getStore(){
    return withLatestFrom(this.store);
  }

  constructor(
    private actions$: Actions,
    private addressService: AddressService,
    private store: Store<AppState>
  ) {}

}
