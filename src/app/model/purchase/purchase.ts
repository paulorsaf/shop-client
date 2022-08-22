import { Address } from "../address/address"

export type Purchase = {
    id: string;
    
    address: Address;
    createdAt: string;
    payment: Payment;
    status: string;
}

export type Payment = {
    error: any;
    type: string;
}