import { Purchase } from "src/app/model/purchase/purchase";

export type PurchaseDetailState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    purchase?: Purchase;
}