import { CreditCard } from "src/app/model/payment/credit-card";

export type CreditCardsState = {
    error: any;
    isDeleted: boolean;
    isDeleting: boolean;
    isLoaded: boolean;
    isLoading: boolean;
    creditCards: CreditCard[];
}