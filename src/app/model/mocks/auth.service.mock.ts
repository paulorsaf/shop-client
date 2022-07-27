import { of } from "rxjs";

export class AuthServiceMock {
    response = of({});

    login(email: string, password: string) {
        return this.response;
    }
    recoverPassword(email: string) {
        return this.response;
    }
}