export class ProductServiceMock {
    _response;
    
    findById() {
        return this._response;
    }
}