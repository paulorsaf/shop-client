import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { setSelectedColor } from 'src/app/store/product/product.actions';
import { selectColors } from 'src/app/store/product/product.state';

@Component({
  selector: 'app-product-colors',
  templateUrl: './product-colors.component.html',
  styleUrls: ['./product-colors.component.scss'],
})
export class ProductColorsComponent implements OnInit {

  @Input() showRequiredError: boolean;
  
  colors$: Observable<string[]>;
  selectedColor$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.colors$ = this.store.select(selectColors);
    this.selectedColor$ = this.store.select(state => state.product.selectedColor);
  }

  setColor(color: string) {
    this.store.dispatch(setSelectedColor({color}));
  }

}
