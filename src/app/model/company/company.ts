import { Address } from "../address/address";

export type Company = {
    address: Address;
    id: string;
    logo: Image;
    pixKey: string;
}

export type Image = {
    imageUrl: string;
}