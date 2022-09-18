import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ViewWillLeave } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Product, Stock } from 'src/app/model/product/product';
import { ProductNotes } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';
import { clearProduct, loadProduct } from 'src/app/store/product/product.actions';
import { selectHasStockOptions, selectProduct, selectStockOptionSelected } from 'src/app/store/product/product.state';
import { addProduct, addProductNotes, decreaseProduct, removeProduct, removeProductNotes } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { selectTotalPrice, selectTotalQuantityForProductStock } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, ViewWillLeave {

  isLoading$: Observable<boolean>;
  product$: Observable<Product>;
  selectedAmount$: Observable<number>;
  selectedSize$: Observable<string>;
  totalPrice$: Observable<number>;
  
  hasBackButton = true;
  hasTriedToAdd = false;
  notes = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private navController: NavController,
    private store: Store<AppState>
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    this.store.dispatch(clearProduct());

    this.isLoading$ = this.store.select(state => state.product.isLoading);
    this.product$ = this.store.select(state => state.product.product);
    this.selectedAmount$ = this.store.select(selectTotalQuantityForProductStock)
    this.selectedSize$ = this.store.select(state => state.product.selectedSize);
    this.totalPrice$ = this.store.select(selectTotalPrice);

    this.store.dispatch(loadProduct({id: this.getId()}));

    this.getNotesWithProductIdOnce()
      .subscribe(notes => {
        if (notes) {
          this.notes = notes.notes;
        }
      });
  }

  ionViewWillLeave(): void {
    this.getNotesWithProductIdOnce()
      .subscribe(storedProductNotes => {
        if (this.shouldAddProductNotes(storedProductNotes)) {
          this.store.dispatch(addProductNotes({notes: {
            notes: this.notes, productId: this.getId()
          }}))
        } else if (storedProductNotes?.notes && !this.notes) {
          this.store.dispatch(removeProductNotes({productId: this.getId()}));
        }
      });
  }

  private shouldAddProductNotes(storedProductNotes: ProductNotes) {
    if (storedProductNotes?.notes === this.notes) {
      return false;
    } else if (!this.notes) {
      return false;
    }
    return true;
  }

  private getNotesWithProductIdOnce() {
    return this.store
      .select(state => state.shoppingCart.notes)
      .pipe(
        take(1),
        switchMap(notes => of(notes.find(n => n.productId === this.getId())))
      )
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

  addToShoppingCart() {
    this.hasTriedToAdd = true;

    this.store.select(selectHasStockOptions)
      .pipe(take(1))
      .subscribe(hasStockOption => {
        if (hasStockOption) {
          this.addStock();
        } else {
          this.addProduct();
        }
      })
  }

  reduceFromShoppingCart() {
    this.store.select(state => ({
      product: state.product.product,
      stock: selectStockOptionSelected(state),
      shoppingCartProducts: state.shoppingCart.products
    }))
    .pipe(take(1))
    .subscribe(state => {
      const shoppingCartProduct = state.shoppingCartProducts.find(s =>
        s.product.id === state.product.id &&
        state.stock?.id === s.stockOption?.id
      );

      if (shoppingCartProduct.amount === 1) {
        this.store.dispatch(removeProduct({product: shoppingCartProduct}));
      } else {
        this.store.dispatch(decreaseProduct({product: shoppingCartProduct}));
      }
    })
  }

  private addStock() {
    this.store.select(selectStockOptionSelected)
      .pipe(take(1))
      .subscribe(stock => {
        if (stock) {
          this.addProductToShoppingCartWithStockOption(stock);
        }
      })
  }

  private addProduct() {
    this.store.select(selectProduct)
      .pipe(take(1))
      .subscribe(product => {
        this.store.dispatch(addProduct({product: {product}}));
      });
  }

  private addProductToShoppingCartWithStockOption(stockOption: Stock) {
    this.store.select(selectProduct)
      .pipe(take(1))
      .subscribe(product => {
        this.store.dispatch(addProduct({product: {
          product: product,
          stockOption: {
            id: stockOption.id,
            color: stockOption.color,
            size: stockOption.size
          }
        }}));
      })
  }

  private getId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

}
