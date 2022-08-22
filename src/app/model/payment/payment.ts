export type Payment = {
    type: string;
    error?: any;
    receiptUrl?: File;
}

export enum PaymentType {
    MONEY = "MONEY",
    PIX = "PIX"
}