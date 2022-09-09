import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';
import { Company } from 'src/app/model/company/company';
import { Purchase } from 'src/app/model/purchase/purchase';
import { AppState } from 'src/app/store/app-state';
import { selectTotalPrice } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  address$: Observable<Address>;
  company$: Observable<Company>;
  deliveryPrice$: Observable<number>;

  products$: Observable<{amount: number; price: number, priceWithDiscount: number, weight: number}[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.address$ = this.store.select(state => state.shoppingCart.deliveryAddress);
    this.company$ = this.store.select(state => state.company.company);
    this.deliveryPrice$ = this.store.select(state => state.shoppingCart.deliveryPrice);

    this.products$ = this.store.select(state => state.shoppingCart.products.map(p => ({
      amount: p.amount,
      price: p.product.price,
      priceWithDiscount: p.product.priceWithDiscount,
      weight: p.product.weight
    })));
  }

}
