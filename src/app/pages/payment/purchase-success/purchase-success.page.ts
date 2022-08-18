import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Payment } from 'src/app/model/payment/payment';
import { AppState } from 'src/app/store/app-state';
import { clear } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { ShoppingCartState } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-purchase-success',
  templateUrl: './purchase-success.page.html',
  styleUrls: ['./purchase-success.page.scss'],
})
export class PurchaseSuccessPage implements OnInit {

  payment$: Observable<Payment>;
  shoppingCart$: Observable<ShoppingCartState>;

  constructor(
    private navController: NavController,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.payment$ = this.store.select(state => state.shoppingCart.payment);
    this.shoppingCart$ = this.store.select('shoppingCart');
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
