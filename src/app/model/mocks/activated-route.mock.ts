export class ActivatedRouteMock {
    snapshot = {
        paramMap: {
            get: (id: string) => id
        }
    };
};
