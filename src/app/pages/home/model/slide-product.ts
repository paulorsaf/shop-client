import { Price } from "./price";

export type SlideProduct = {
    discount: Price;
    id: number;
    image: string;
    name: string;
    price: Price;
}