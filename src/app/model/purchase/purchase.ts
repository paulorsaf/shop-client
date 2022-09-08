import { Address } from "../address/address"
import { Stock } from "../product/product"

export type Purchase = {
    companyId: string;
    id: string;
    
    address: Address;
    createdAt: string;
    deliveryPrice: number;
    payment: Payment;
    products: PurchaseProduct[];
    status: string;
    totalAmount: number;
    totalPrice: number;
}

export type Payment = {
    card?: PayByCreditCardResponse;
    error: any;
    receiptUrl: string;
    type: string;
}

export type PayByCreditCardResponse = {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
}

export type PurchaseProduct = {
    amount: number;
    id: string;
    price: number;
    priceWithDiscount: number;
    name: string;
    stock: Stock;
    totalAmount: number;
    totalPrice: number;
};