import { of } from "rxjs";

export class PurchaseServiceMock {
    response = of({});

    findAll() {
        return this.response || of({});
    }
    findById() {
        return this.response || of({});
    }
    findLastPurchase() {
        return this.response || of({});
    }
    findPaymentPurchase() {
        return this.response || of({});
    }
}