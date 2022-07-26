export type Product = {
    description: string;
    id: string;
    images: ProductImage[];
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

export type ProductImage = {
    imageUrl: string;
}