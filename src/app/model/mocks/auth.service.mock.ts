import { of } from "rxjs";

export class AuthServiceMock {
    response = of({});

    login() {
        return this.response || of({});
    }
    loginByToken() {
        return this.response || of({});
    }
    logout() {
        return this.response || of({});
    }
    recoverPassword() {
        return this.response || of({});
    }
    register() {
        return this.response || of({});
    }
}