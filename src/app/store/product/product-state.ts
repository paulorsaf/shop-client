import { Product } from "src/app/model/product/product";

export type ProductState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    product: Product;
};
