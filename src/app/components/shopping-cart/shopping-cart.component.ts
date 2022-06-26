import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';
import { totalPrice, totalQuantity } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  products$: Observable<ShoppingCartProduct[]>;
  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => state.shoppingCart.products);
    this.totalPrice$ = this.store.select(totalPrice);
    this.totalQuantity$ = this.store.select(totalQuantity);
  }

}
