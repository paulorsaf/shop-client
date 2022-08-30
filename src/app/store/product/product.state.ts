import { createSelector } from "@ngrx/store";
import { Product } from "src/app/model/product/product";
import { AppState } from "../app-state";

export type ProductState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    product: Product;
    selectedColor: string;
    selectedSize: string;
};

export const selectProduct = (state: AppState) => state.product.product;
export const selectProductState = (state: AppState) => state.product;

export const selectHasStockOptions = createSelector(
    selectProductState,
    (state: ProductState) => {
        return state.product.stock?.length >= 0 ? true : false;
    }
);

export const selectStockOptionSelected = createSelector(
    selectProductState,
    (state: ProductState) => {
        const hasSize = state.product.stock?.some(s => s.size);
        const hasColor = state.product.stock?.some(s => s.color);

        if (hasSize || hasColor) {
            return state.product.stock?.find(s =>
                s.color === state.selectedColor && s.size === state.selectedSize
            );
        }
        return state.product.stock?.length ? state.product.stock[0] : null;
    }
);

export const selectColors = createSelector(
    selectProductState,
    (state: ProductState) => {
        const hasSize = state.product.stock?.some(s => s.size);

        return state.product.stock
            ?.filter(s => {
                if (hasSize) {
                    return s.size === state.selectedSize;
                }
                return true;
            })
            .map(s => s.color);
    }
);