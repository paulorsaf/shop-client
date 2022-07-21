export type Product = {
    description: string;
    id: string;
    image: string;
    images: string[];
    price: number;
    priceWithDiscount: number;
    name: string;
    stockOptions?: StockOption[];
};

export type StockOption = {
    color: string;
    id: string;
    quantity: number;
    size: string;
}
