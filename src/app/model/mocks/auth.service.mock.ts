import { of } from "rxjs";

export class AuthServiceMock {
    response = of({});

    login(email: string, password: string) {
        return this.response || of({});
    }
    loginByToken() {
        return this.response || of({});
    }
    logout() {
        return this.response || of({});
    }
    recoverPassword(email: string) {
        return this.response || of({});
    }
}