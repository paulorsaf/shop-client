import { Address } from "../address/address"
import { Stock } from "../product/product"

export type Purchase = {
    companyId: string;
    id: string;
    
    address: Address;
    createdAt: string;
    payment: Payment;
    products: PurchaseProduct[];
    status: string;
    totalAmount: number;
    totalPrice: number;
}

export type Payment = {
    error: any;
    receiptUrl: string;
    type: string;
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