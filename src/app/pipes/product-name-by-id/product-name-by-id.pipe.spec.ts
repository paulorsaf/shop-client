import { ProductNameByIdPipe } from "./product-name-by-id.pipe"

describe("ProductNameByIdPipe pipe", () => {

    let pipe = new ProductNameByIdPipe();
    const products = [{id: "1", name: "product1"}, {id: "2", name: "product2"}] as any;

    it('given product found, then return product name', () => {
        expect(pipe.transform("2", products)).toEqual("product2");
    })

    it('given product not found, then return product id', () => {
        expect(pipe.transform("3", products)).toEqual("3");
    })

})