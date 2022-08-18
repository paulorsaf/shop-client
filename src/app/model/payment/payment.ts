export type Payment = {
    paymentType: string;
    receipt?: File;
}

export enum PaymentType {
    MONEY = "MONEY",
    PIX = "PIX"
}