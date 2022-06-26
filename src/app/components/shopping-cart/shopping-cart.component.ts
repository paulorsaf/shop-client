import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';
import { minusItem, plusItem, removeProduct } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { totalPrice, totalQuantity } from 'src/app/store/shopping-cart/shopping-cart.state';

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
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(state => state.shoppingCart.products);
    this.totalPrice$ = this.store.select(totalPrice);
    this.totalQuantity$ = this.store.select(totalQuantity);
  }

  minus(shoppingCartProduct: ShoppingCartProduct) {
    this.store.dispatch(minusItem({shoppingCartProduct}));
  }

  add(shoppingCartProduct: ShoppingCartProduct) {
    this.store.dispatch(plusItem({shoppingCartProduct}));
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
          this.store.dispatch(removeProduct({shoppingCartProduct}));
        }
      }]
    }).then(alert => alert.present());
  }

  identify(index: number, item: ShoppingCartProduct){
    return `${index}${item.product.id}`;
  }

}
