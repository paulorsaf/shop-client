import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Product, StockOption } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-product-colors',
  templateUrl: './product-colors.component.html',
  styleUrls: ['./product-colors.component.scss'],
})
export class ProductColorsComponent implements OnInit {

  @Input() selectedColor: string;
  @Input() selectedSize$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() showRequiredError: boolean;
  
  @Output() colorChanged = new EventEmitter<string>();
  
  colors$: Observable<string[]>;
  product$: Observable<Product>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.colors$ = this.getColors();

    this.product$ = this.store.select(state => state.product.product);
  }

  setColor(color: string) {
    this.colorChanged.emit(color);
  }

  private getColors() {
    return this.selectedSize$.pipe(
      switchMap((size: string) => 
        this.store.select(state => 
          this.filterColors(size, state.product.product.stockOptions)
        )
      )
    );
  }

  private filterColors(size: string, stockOptions: StockOption[]) {
    const colors: string[] = [];
    stockOptions?.forEach(stockOption => {
      if (!size || size === stockOption.size) {
        colors.push(stockOption.color);
      }
    });
    return colors;;
  }

}
