import { of } from "rxjs";

export class PurchaseServiceMock {
    response = of({});

    findAll() {
        return this.response || of({});
    }
    findById() {
        return this.response || of({});
    }
}