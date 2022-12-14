import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { openShoppingCart } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { selectTotalPrice, selectTotalQuantity } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() hasSearchButton = false;

  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.totalQuantity$ = this.store.select(selectTotalQuantity);
  }

  showShoppingCart() {
    this.store.dispatch(openShoppingCart());
  }

}
