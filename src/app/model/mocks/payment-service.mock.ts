import { of } from "rxjs";

export class PaymentServiceMock {
    response: any;

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
