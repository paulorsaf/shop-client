import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrls: ['./product-sizes.component.scss'],
})
export class ProductSizesComponent implements OnInit {

  @Input() selectedSize: string;
  @Input() showRequiredError: boolean;

  @Output() sizeChanged = new EventEmitter<string>();

  product$: Observable<Product>;
  sizes$: Observable<string[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.product$ = this.store.select(state => state.product.product);
    this.sizes$ = this.filterSizes();
  }

  setSize(size: string) {
    this.sizeChanged.emit(size);
  }

  private filterSizes() {
    return this.store.select(state => {
      const sizes: string[] = [];
      state.product.product?.stockOptions?.forEach(stockOption => {
        if (!sizes.some(s => s === stockOption.size)) {
          sizes.push(stockOption.size);
        }
      })
      return sizes;
    });
  }

}
