import { of } from "rxjs";

export class TrendingsServiceMock {
    response = of({});

    findAll() {
        return this.response;
    }
}