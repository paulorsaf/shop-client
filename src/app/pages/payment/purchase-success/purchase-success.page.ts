import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Payment } from 'src/app/model/payment/payment';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { loadLastPurchase, loadPaymentPurchaseById } from 'src/app/store/purchases/purchases.actions';
import { clear } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.page.html',
  styleUrls: ['./purchase-success.page.scss'],
})
export class PurchaseSuccessPage implements OnInit {

  isLoadingPaymentPurchase$: Observable<boolean>;
  paymentPurchase$: Observable<Purchase>;
  payment$: Observable<Payment>;
  shoppingCart$: Observable<ShoppingCartState>;

  constructor(
    private navController: NavController,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoadingPaymentPurchase$ = this.store.select(state => state.purchases.isLoadingPaymentPurchase);
    this.paymentPurchase$ = this.store.select(state => state.purchases.paymentPurchase);
    this.payment$ = this.store.select(state => state.shoppingCart.payment);
    this.shoppingCart$ = this.store.select('shoppingCart');

    this.store.select('purchaseDetail').pipe(take(1)).subscribe(state => {
      if (state.purchase) {
        this.store.dispatch(loadPaymentPurchaseById());
      } else {
        this.shoppingCart$.pipe(take(1)).subscribe(state => {
          if (state.payment?.type !== "MONEY") {
            this.store.dispatch(loadLastPurchase());
          }
        })
      }
    })
  }

  home() {
    this.store.dispatch(clear());
    this.navController.navigateRoot('home');
  }

  myPurchases() {
    this.store.dispatch(clear());
    this.navController.navigateRoot('home');
    setTimeout(() => {
      this.router.navigate(['purchases'])
    }, 100)
  }

}
