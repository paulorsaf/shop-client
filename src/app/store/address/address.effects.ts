import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AddressService } from 'src/app/services/address/address.service';
import { searchByZipCode, searchByZipCodeFail, searchByZipCodeSuccess } from './address.actions';

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

  constructor(
    private actions$: Actions,
    private addressService: AddressService
  ) {}

}
