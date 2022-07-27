import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/model/product/product';
import { AppState } from 'src/app/store/app-state';
import { loadProduct } from 'src/app/store/product/product.actions';
import { addProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { selectTotalPrice } from 'src/app/store/shopping-cart/shopping-cart.state';

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

  hasBackButton = true;
  hasTriedToAdd = false;
  selectedColor = '';
  selectedSize = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private navController: NavController,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {
    this.hasBackButton = (this.location.getState() as any)?.navigationId !== 1;
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.product.isLoading);
    this.product$ = this.store.select(state => state.product.product);
    this.totalPrice$ = this.store.select(selectTotalPrice);

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

    this.product$.pipe(take(1)).subscribe(product => {
      if (product.stockOptions?.length) {
        this.addProductToShoppingCartWithStockOption(product);
      } else {
        this.store.dispatch(addProduct({product: {product}}));
      }

      this.showMessage();
    })
  }

  goHome() {
    this.navController.navigateRoot('/');
  }

  private async showMessage() {
    const toast = await this.toastController.create({
      color: "warning",
      message: "Produto adicionado ao carrinho",
      position: "bottom",
      duration: 1000
    });
    toast.present();
  }

  private addProductToShoppingCartWithStockOption(product: Product) {
    const stockOption = this.findSelectedStockOption(product);
    this.store.dispatch(addProduct({product: {
      product: product,
      stockOption: {
        id: stockOption.id,
        color: stockOption.color,
        size: stockOption.size
      }
    }}));
  }

  private findSelectedStockOption(product: Product) {
    return product.stockOptions.find(s => {
      if (s.color && s.size) {
        return s.color === this.selectedColor && s.size === this.selectedSize;
      }
      if (s.color) {
        return s.color === this.selectedColor;
      }
      if (s.size) {
        return s.size === this.selectedSize;
      }
    });
  }

}
