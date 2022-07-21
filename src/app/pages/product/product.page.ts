import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product/product';
import { ProductOptionsPipe } from 'src/app/pipes/product-options/product-options.pipe';
import { AppState } from 'src/app/store/app-state';
import { loadProduct } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  isLoading$: Observable<boolean>;
  product$: Observable<Product>;
  totalPrice$: Observable<number>;
  
  selectedSize$ = new BehaviorSubject<string>("");

  hasTriedToAdd = false;
  selectedColor = '';
  selectedSize = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productOptionsPipe: ProductOptionsPipe,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.product.isLoading);
    this.product$ = this.store.select(state => state.product.product);
    this.totalPrice$ = of(0);//this.store.select(totalPrice);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadProduct({id}));
  }

  setColor(color: string) {
    this.selectedColor = color;
  }

  setSize(event: any) {
    this.selectedColor = "";
    this.selectedSize = event.target.value;
    this.selectedSize$.next(this.selectedSize);
  }

  addToShoppingCart() {
    this.hasTriedToAdd = true;
  }

}
