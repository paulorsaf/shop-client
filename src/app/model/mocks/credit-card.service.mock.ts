import { of } from "rxjs";

export class CreditCardServiceMock {
    response = of({});

    delete() {
        return this.response || of({});
    }
    find() {
        return this.response || of({});
    }
}