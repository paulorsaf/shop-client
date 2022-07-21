import { of } from "rxjs";

export class ProductServiceMock {
    response = of({});

    findById() {
        return this.response;
    }
    findByCategory() {
        return this.response;
    }
};
