import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SegmentCustomEvent, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/model/product/product';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';
import { loadProduct } from 'src/app/store/product/product.actions';
import { addProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { isProductOnShoppingCart } from 'src/app/store/shopping-cart/shopping-cart.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  isLoading$: Observable<boolean>;
  product$: Observable<Product>;

  hasTriedToAdd = false;
  selectedColor = '';
  selectedSize = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.product.isLoading);
    this.product$ = this.store.select(state => state.product.product);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadProduct({id}));
  }

  setColor(color: string) {
    this.selectedColor = color;
  }

  setSize(event: SegmentCustomEvent) {
    this.selectedSize = event.target.value;
  }

  addToShoppingCart() {
    this.hasTriedToAdd = true;
    this.product$.pipe(take(1)).subscribe(product => {
      if (product.colors?.length && !this.selectedColor) {
        return;
      }
      if (product.sizes?.length && !this.selectedSize) {
        return;
      }

      this.dispatchAddProduct(product);
      this.showAddProductToShoppingCartSuccessMessage();
    });
  }

  private dispatchAddProduct(product: Product){
    const shoppingCartProduct: ShoppingCartProduct = {
      product
    };
    if (product.colors?.length) {
      shoppingCartProduct.color = this.selectedColor;
    }
    if (product.sizes?.length) {
      shoppingCartProduct.size = this.selectedSize;
    }

    this.store.dispatch(addProduct({shoppingCartProduct}));
  }

  private async showAddProductToShoppingCartSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Produto adicionado ao carrinho',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

}
