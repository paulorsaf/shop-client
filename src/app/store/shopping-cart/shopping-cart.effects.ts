import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ShoppingCartComponent } from 'src/app/components/shopping-cart/shopping-cart.component';
import { Payment, PaymentType } from 'src/app/model/payment/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { AppState } from '../app-state';
import { closeShoppingCart, makePurchase, makePurchaseByCreditCard, makePurchaseByMoney, makePurchaseByPix, makePurchaseFail, makePurchaseSuccess, openShoppingCart } from './shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {

  makePurchaseEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makePurchase),
      switchMap((params: {payment: Payment, purchaseId?: string}) => {
        if (params.payment.type === PaymentType.PIX) {
          return of(makePurchaseByPix({
            purchaseId: params.purchaseId,
            receipt: params.payment.receiptUrl
          }));
        }
        if (params.payment.type === PaymentType.MONEY) {
          return of(makePurchaseByMoney({
            purchaseId: params.purchaseId
          }));
        }
        if (params.payment.type === PaymentType.CREDIT_CARD) {
          return of(makePurchaseByCreditCard({
            billingAddress: params.payment.billingAddress,
            creditCard: params.payment.creditCard,
            purchaseId: params.purchaseId
          }));
        }
      })
    )
  );

  makePurchaseByPixEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makePurchaseByPix),
      this.getStore(),
      switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
        this.paymentService.payByPix({
          deliveryAddress: storeState.shoppingCart.deliveryAddress,
          deliveryPrice: storeState.shoppingCart.deliveryPrice,
          purchaseId: action.purchaseId,
          receipt: action.receipt,
          shoppingCart: storeState.shoppingCart.products
        }).pipe(
          map(() => makePurchaseSuccess()),
          catchError(error => of(makePurchaseFail({error})))
        )
      )
    )
  );

  makePurchaseByMoneyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makePurchaseByMoney),
      this.getStore(),
      switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
        this.paymentService.payByMoney({
          deliveryAddress: storeState.shoppingCart.deliveryAddress,
          deliveryPrice: storeState.shoppingCart.deliveryPrice,
          purchaseId: action.purchaseId,
          shoppingCart: storeState.shoppingCart.products
        }).pipe(
          map(() => makePurchaseSuccess()),
          catchError(error => of(makePurchaseFail({error})))
        )
      )
    )
  );

  makePurchaseByCreditCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makePurchaseByCreditCard),
      this.getStore(),
      switchMap(([action, storeState]: [action: any, storeState: AppState]) =>
        this.paymentService.payByCreditCard({
          billingAddress: action.billingAddress,
          creditCard: action.creditCard,
          deliveryAddress: storeState.shoppingCart.deliveryAddress,
          deliveryPrice: storeState.shoppingCart.deliveryPrice,
          purchaseId: action.purchaseId,
          shoppingCart: storeState.shoppingCart.products
        }).pipe(
          map(() => makePurchaseSuccess()),
          catchError(error => of(makePurchaseFail({error})))
        )
      )
    )
  );

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

  private getStore(){
    return withLatestFrom(this.store);
  }

  constructor(
    private actions$: Actions,
    private modalController: ModalController,
    private paymentService: PaymentService,
    private store: Store<AppState>
  ) {}

}
