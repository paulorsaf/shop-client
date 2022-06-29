import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { concatMap, map, tap, } from 'rxjs/operators';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { AppState } from '../app-state';
import { closeShoppingCart, openShoppingCart } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

  openShoppingCartEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openShoppingCart),
      concatMap(() =>
        from(this.modalController.create({
          component: ShoppingCartComponent,
          breakpoints: [0, 0.25, 0.9],
          initialBreakpoint: 0.25
        }))
      ),
      tap(modal => modal.present()),
      map(modal => modal.onWillDismiss()),
      tap(modal => modal.then(() => this.store.dispatch(closeShoppingCart())))
    ), {
      dispatch: false
    }
  );

  constructor(
    private actions$: Actions,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {}

}
