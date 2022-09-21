import { Address } from "../address/address";

export type Company = {
    aboutUs: string;
    address: Address;
    id: string;
    logo: Image;
    payment: Payment;
    facebook: string;
    instagram: string;
    website: string;
    whatsapp: string;
}

export type Image = {
    imageUrl: string;
}

export type Payment = {
    creditCard: CreditCardPayment;
    money: boolean;
    pixKey: string;
}

export type CreditCardPayment = {
    flags: string[]
    fee?: {
        percentage: number;
        value: number;
    }
}