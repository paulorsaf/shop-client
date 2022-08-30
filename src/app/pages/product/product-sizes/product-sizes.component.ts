import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { setSelectedSize } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrls: ['./product-sizes.component.scss'],
})
export class ProductSizesComponent implements OnInit {

  @Input() showRequiredError: boolean;

  product$: Observable<Product>;
  selectedSize$: Observable<string>;
  sizes$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.product$ = this.store.select(state => state.product.product);
    this.selectedSize$ = this.store.select(state => state.product.selectedSize);
    this.sizes$ = this.filterSizes();
  }

  setSize($event: any) {
    this.store.dispatch(setSelectedSize({size: $event.detail.value}));
  }

  private filterSizes() {
    return this.store.select(state => {
      const sizes: string[] = [];
      state.product.product?.stock?.forEach(stockOption => {
        if (!sizes.some(s => s === stockOption.size)) {
          sizes.push(stockOption.size);
        }
      })
      return sizes;
    });
  }

}
