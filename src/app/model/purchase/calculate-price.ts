export type CalculatePrice = {
    readonly address?: Address,
    readonly cupom?: string,
    readonly paymentType?: string,
    readonly products: Product[]
}

type Address = {
    readonly destinationZipCode: string;
    readonly originZipCode: string;
}

type Product = {
    readonly amount: number;
    readonly price: number;
    readonly priceWithDiscount?: number;
    readonly weight: number;
}

export type CalculatePriceResponse = {
    readonly productsPrice: number;
    readonly deliveryPrice: number;
    readonly discount: number;
    readonly paymentFee: number;
    readonly serviceFee: number;
    readonly totalPrice: number;
    readonly totalWithPaymentFee: number;
}