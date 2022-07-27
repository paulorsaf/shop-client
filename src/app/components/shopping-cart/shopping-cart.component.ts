import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';
import { addProduct, decreaseProduct, removeProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { selectTotalPrice, selectTotalQuantity } from 'src/app/store/shopping-cart/shopping-cart.state';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  products$: Observable<ShoppingCartProduct[]>;
  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => state.shoppingCart.products);
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.totalQuantity$ = this.store.select(selectTotalQuantity);
  }

  minus(shoppingCartProduct: ShoppingCartProduct) {
    this.store.dispatch(decreaseProduct({product: shoppingCartProduct}));
  }

  add(shoppingCartProduct: ShoppingCartProduct) {
    this.store.dispatch(addProduct({product: shoppingCartProduct}));
  }

  askRemove(shoppingCartProduct: ShoppingCartProduct) {
    this.alertController.create({
      header: 'Remover item',
      message: 'Deseja remover item do carrinho?',
      buttons: [{
        text: 'Não'
      }, {
        text: 'Sim',
        id: 'remove-item',
        handler: () => {
          this.store.dispatch(removeProduct({product: shoppingCartProduct}));
        }
      }]
    }).then(alert => alert.present());
  }

  onFinishPurchase() {
    this.store.select('user').pipe(take(1)).subscribe(state => {
      if (!state.user) {
        this.modalController.create({
          component: LoginComponent
        }).then(modal => {
          modal.present();
        })
      }
    })
  }

  identify(index: number, item: ShoppingCartProduct){
    return `${index}${item.product.id}`;
  }

}
