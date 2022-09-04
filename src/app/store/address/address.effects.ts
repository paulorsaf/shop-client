import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Address } from 'src/app/model/address/address';
import { AddressService } from 'src/app/services/address/address.service';
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
      switchMap((params: {zipCode: string}) =>
        this.addressService.findDeliveryPrice(params.zipCode).pipe(
          map(deliveryPrice => getDeliveryPriceSuccess({deliveryPrice})),
          catchError(error => of(getDeliveryPriceFail({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private addressService: AddressService
  ) {}

}
