import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { AppState } from '../app-state';
import { closeShoppingCart, openShoppingCart } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

  openShoppingCartEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openShoppingCart),
      map(async () => {
        const modal = await this.modalController.create({
          component: ShoppingCartComponent,
          initialBreakpoint: 0.5,
          breakpoints: [0, .5, .90, 1]
        })

        modal.present();
        modal.onWillDismiss().then(() => {
          this.store.dispatch(closeShoppingCart());
        });
      })
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
