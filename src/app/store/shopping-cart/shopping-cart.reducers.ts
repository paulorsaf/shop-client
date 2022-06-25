import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { isAddProductOnShoppingCart, ShoppingCartState } from './shopping-cart.state';
import { addProduct } from './shopping-cart.actions';

const initialState: ShoppingCartState = appInitialState.shoppingCart;

const shoppingCartReduce = createReducer(
  initialState,
  on(addProduct, (state, action) => ({
    ...state,
    products: isAddProductOnShoppingCart(state, action.shoppingCartProduct) ?
      state.products.map(p => {
        if (p.product.id === action.shoppingCartProduct.product.id) {
          return {
            ...p,
            quantity: p.quantity + 1
          };
        }
        return p;
      })
      :
      [...state.products, {...action.shoppingCartProduct, quantity: 1}]
  }))
);

export const shoppingCartReducer = (state: ShoppingCartState, action: any) =>
  shoppingCartReduce(state, action);
