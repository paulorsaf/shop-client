import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { AppState } from 'src/app/store/app-state';

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
    this.products$ = of([]); //this.store.select(state => state.shoppingCart.products);
    this.totalPrice$ = of(0); //this.store.select(totalPrice);
    this.totalQuantity$ = of(0) //this.store.select(totalQuantity);
  }

  minus(shoppingCartProduct: ShoppingCartProduct) {
    // this.store.dispatch(minusItem({shoppingCartProduct}));
  }

  add(shoppingCartProduct: ShoppingCartProduct) {
    // this.store.dispatch(plusItem({shoppingCartProduct}));
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
          // this.store.dispatch(removeProduct({shoppingCartProduct}));
        }
      }]
    }).then(alert => alert.present());
  }

  onFinishPurchase() {

  }

  identify(index: number, item: ShoppingCartProduct){
    return `${index}${item.product.id}`;
  }

}
