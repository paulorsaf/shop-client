export class HttpClientMock {
    _response;
    _urlCalled = "";

    get(url: string) {
        this._urlCalled = url;
        return this._response;
    }
}