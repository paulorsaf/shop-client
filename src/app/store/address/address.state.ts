import { Address } from "src/app/model/address/address";

export type AddressState = {
    address: Address;
    deliveryPrice: number;
    error: any;
    isGettingDeliveryPrice: boolean;
    isGotDeliveryPrice: boolean;
    isLoaded: boolean;
    isLoading: boolean;
}