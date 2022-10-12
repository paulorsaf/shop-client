import { Address } from "../address/address"
import { Stock } from "../product/product"
import { ProductNotes } from "../product/product-notes"

export type Purchase = {
    companyId: string;
    id: string;
    
    address: Address;
    createdAt: string;
    deliveryPrice: number;
    payment: Payment;
    price: Price;
    productNotes: ProductNotes[];
    products: PurchaseProduct[];
    reason: string;
    status: string;
    totalAmount: number;
    totalPrice: number;
}

export type Payment = {
    card?: PayByCreditCardResponse;
    cupom: string;
    error: any;
    id: string;
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
    weight: number;
};

type Price = {
    products: number;
    delivery: number;
    discount: number;
    paymentFee: number;
    total: number;
    totalWithPaymentFee: number;
}