import { of } from "rxjs";

export class BannersServiceMock {
    response = of({});

    findAll() {
        return this.response;
    }
}