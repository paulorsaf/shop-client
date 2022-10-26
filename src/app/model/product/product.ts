export type Product = {
    description: string;
    id: string;
    images: ProductImage[];
    price: number;
    priceWithDiscount: number;
    name: string;
    stock?: Stock[];
    unit: string;
    weight: number;
};

export type Stock = {
    color: string;
    id: string;
    quantity: number;
    size: string;
}

export type ProductImage = {
    imageUrl: string;
}