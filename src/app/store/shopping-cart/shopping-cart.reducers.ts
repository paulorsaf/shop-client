import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { isAddProductOnShoppingCart, isShoppingCardProductSameAsAddProduct, ShoppingCartState } from './shopping-cart.state';
import { addProduct, closeShoppingCart, minusItem, openShoppingCart, plusItem, removeProduct } from './shopping-cart.actions';

const initialState: ShoppingCartState = appInitialState.shoppingCart;

const shoppingCartReduce = createReducer(
  initialState,
  on(addProduct, (state, action) => ({
    ...state,
    products: isAddProductOnShoppingCart(state, action.shoppingCartProduct) ?
      state.products.map(p => {
        if (isShoppingCardProductSameAsAddProduct(p, action.shoppingCartProduct)) {
          return {...p, quantity: p.quantity + 1};
        }
        return p;
      })
      :
      [...state.products, {...action.shoppingCartProduct, quantity: 1}]
  })),
  on(openShoppingCart, (state) => ({
    ...state,
    isOpen: true
  })),
  on(closeShoppingCart, (state) => ({
    ...state,
    isOpen: false
  })),
  on(plusItem, (state, action) => ({
    ...state,
    products: state.products.map(p => {
      if (p === action.shoppingCartProduct) {
        return {...p, quantity: p.quantity + 1};
      }
      return p;
    })
  })),
  on(minusItem, (state, action) => ({
    ...state,
    products: state.products.map(p => {
      if (p === action.shoppingCartProduct) {
        return {...p, quantity: p.quantity - 1};
      }
      return p;
    })
  })),
  on(removeProduct, (state, action) => ({
    ...state,
    products: state.products.filter(p => p !== action.shoppingCartProduct)
  }))
);

export const shoppingCartReducer = (state: ShoppingCartState, action: any) =>
  shoppingCartReduce(state, action);
