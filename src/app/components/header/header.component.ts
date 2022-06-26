import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { openShoppingCart } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { totalQuantity } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() hasSearchButton = false;

  totalQuantity$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.totalQuantity$ = this.store.select(totalQuantity);
  }

  showShoppingCart() {
    this.store.dispatch(openShoppingCart());
  }

}
