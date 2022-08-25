import { of } from "rxjs";

export class CompanyServiceMock {
    response = of({});

    find() {
        return this.response || of({});
    }
    findById() {
        return this.response || of({});
    }
}