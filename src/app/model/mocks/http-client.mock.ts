export class HttpClientMock {
    response;
    urlCalled = "";

    get(url: string) {
        this.urlCalled = url;
        return this.response;
    }
}