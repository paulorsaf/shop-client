import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company/company';
import { AppState } from 'src/app/store/app-state';
import { selectTotalPrice } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  company$: Observable<Company>;
  totalPrice$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.company$ = this.store.select(state => state.company.company);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

}
