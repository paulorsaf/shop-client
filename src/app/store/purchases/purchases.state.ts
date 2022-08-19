import { Purchase } from "src/app/model/purchase/purchase";

export type PurchasesState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    purchases: Purchase[];
}