export type Trending = {
    name: string;
    description: string;
    id: string;
    images: TrendingImage[];
    price: number;
    priceWithDiscount: number;
};

export type TrendingWrapper = {
    productId: string;
};

export type TrendingImage = {
    imageUrl: string;
}