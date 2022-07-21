import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';

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
    this.totalQuantity$ = of(0); //this.store.select(totalQuantity);
  }

  showShoppingCart() {
    // this.store.dispatch(openShoppingCart());
  }

}
