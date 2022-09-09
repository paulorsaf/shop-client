import { of } from "rxjs";

export class PaymentServiceMock {
    response: any;

    calculatePrice() {
        return this.response || of();
    }
    payByMoney() {
        return this.response || of();
    }
    payByPix() {
        return this.response || of();
    }
    payByCreditCard() {
        return this.response || of();
    }
};
