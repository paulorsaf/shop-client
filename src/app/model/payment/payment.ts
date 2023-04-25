import { Address } from "../address/address";

export type Payment = {
    billingAddress?: Address;
    changeFor?: number;
    creditCard?: CreditCardPayment;
    creditCardId?: string;
    cupom?: string;
    type: string;
    error?: any;
    receiptUrl?: File;
}

export enum PaymentType {
    MONEY = "MONEY",
    PIX = "PIX",
    CREDIT_CARD = "CREDIT_CARD"
}

export type CreditCardPayment = {
    cardFlag: string;
    cardHolder: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCvc: string;
}