import { createReducer, on } from '@ngrx/store';
import { appInitialState } from '../app-initial-state';
import { addProduct, addProductNotes, clear, closeShoppingCart, decreaseProduct, makePurchase, makePurchaseFail, makePurchaseSuccess, openShoppingCart, removeProduct, removeProductNotes, setDeliveryAddress, setDeliveryPrice } from './shopping-cart.actions';
import { ShoppingCartState } from './shopping-cart.state';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { calculatePurchasePrice, calculatePurchasePriceFail, calculatePurchasePriceSuccess } from '../purchases/purchases.actions';

const initialState: ShoppingCartState = appInitialState.shoppingCart;

const shoppingCartReduce = createReducer(
  initialState,
  on(addProduct, (state, action) => {
    const hasSameProduct = state.products.some(p => isSameProductStock(p, action.product));

    return {
      ...state,
      products: hasSameProduct ?
        state.products.map(p => {
          if (isSameProductStock(p, action.product)) {
            return { ...p, amount: p.amount + 1 }
          }
          return p;
        })
        :
        [
          ...state.products, 
          { ...action.product, amount: 1 }
        ]
    }
  }),
  on(decreaseProduct, (state, action) => {
    return {
      ...state,
      products: state.products.map(p => {
        if (isSameProductStock(p, action.product)) {
          return { ...p, amount: p.amount - 1 }
        }
        return p;
      })
    }
  }),
  on(removeProduct, (state, action) => {
    return {
      ...state,
      products: state.products.filter(p => {
        if (isSameProductStock(p, action.product)) {
          return false;
        }
        return true;
      })
    }
  }),
  on(openShoppingCart, (state) => {
    return {
      ...state,
      isOpen: true
    }
  }),
  on(closeShoppingCart, (state) => {
    return {
      ...state,
      isOpen: false
    }
  }),
  on(setDeliveryAddress, (state, action) => {
    return {
      ...state,
      deliveryAddress: action.address
    }
  }),
  on(makePurchase, (state, action) => {
    return {
      ...state,
      error: undefined,
      isPaid: false,
      isPaying: true,
      payment: action.payment
    }
  }),
  on(makePurchaseSuccess, (state) => {
    return {
      ...state,
      isPaid: true,
      isPaying: false
    }
  }),
  on(makePurchaseFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isPaid: false,
      isPaying: false
    }
  }),
  on(clear, () => {
    return {
      ...initialState
    }
  }),
  on(setDeliveryPrice, (state, action) => {
    return {
      ...state,
      deliveryPrice: action.deliveryPrice
    }
  }),
  on(calculatePurchasePrice, (state) => ({
    ...state,
    error: undefined,
    isCalculatedPrice: false,
    isCalculatingPrice: true,
    price: undefined
  })),
  on(calculatePurchasePriceSuccess, (state, action) => ({
    ...state,
    isCalculatedPrice: true,
    isCalculatingPrice: false,
    price: action.price
  })),
  on(calculatePurchasePriceFail, (state, action) => ({
    ...state,
    error: action.error,
    isCalculatedPrice: false,
    isCalculatingPrice: false,
  })),
  on(addProductNotes, (state, action) => ({
    ...state,
    notes: state.notes.some(n => n.productId === action.notes.productId) ?
      state.notes.map(n => n.productId === action.notes.productId ? action.notes : n) :
      [...state.notes, action.notes]
  })),
  on(removeProductNotes, (state, action) => ({
    ...state,
    notes: state.notes.filter(n => n.productId !== action.productId)
  }))
);


const isSameProductStock = (p1: ShoppingCartProduct, p2: ShoppingCartProduct) =>
  p1.product.id == p2.product.id &&
  p1.stockOption?.id == p2.stockOption?.id;

export const shoppingCartReducer = (state: ShoppingCartState, action: any) =>
  shoppingCartReduce(state, action);
