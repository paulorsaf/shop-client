import { Address } from "../address/address";

export type Company = {
    aboutUs: string;
    address: Address;
    id: string;
    logo: Image;
    payment: Payment;
    pixKey: string;
}

export type Image = {
    imageUrl: string;
}

export type Payment = {
    creditCard: CreditCardPayment;
    pixKey: string;
}

export type CreditCardPayment = {
    flags: ['MASTERCARD', 'VISA']
}