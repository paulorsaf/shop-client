import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { clear } from 'src/app/store/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {

  constructor(
    private navController: NavController,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
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
