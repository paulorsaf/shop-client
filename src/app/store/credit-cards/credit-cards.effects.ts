import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CreditCardService } from 'src/app/services/credit-card/credit-card.service';
import { deleteCreditCard, deleteCreditCardFail, deleteCreditCardSuccess, loadCreditCards, loadCreditCardsFail, loadCreditCardsSuccess } from './credit-cards.actions';

@Injectable()
export class CreditCardsEffects {

  loadCreditCardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreditCards),
      switchMap(() =>
        this.creditCardService.find().pipe(
          map(creditCards => loadCreditCardsSuccess({creditCards})),
          catchError(error => of(loadCreditCardsFail({error})))
        )
      )
    )
  );

  deleteCreditCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCreditCard),
      switchMap((params: {id: string}) =>
        this.creditCardService.delete(params.id).pipe(
          map(() => deleteCreditCardSuccess()),
          catchError(error => of(deleteCreditCardFail({error})))
        )
      )
    )
  );

  deleteCreditCardEffectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCreditCardSuccess),
      switchMap(() => of(loadCreditCards()))
    )
  );

  constructor(
    private actions$: Actions,
    private creditCardService: CreditCardService
  ) {}

}
