import { Address } from "src/app/model/address/address";

export type AddressState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    address: Address;
}