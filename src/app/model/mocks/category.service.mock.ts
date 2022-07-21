import { of } from "rxjs";

export class CategoryServiceMock {
    response = of({});

    findAll() {
        return this.response;
    }
}