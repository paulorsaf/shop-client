import { PaymentTypePipe } from "./payment-type.pipe"

describe("PaymentType pipe", () => {

    let pipe = new PaymentTypePipe();

    it('given payment is PIX, then return PIX', () => {
        expect(pipe.transform("PIX")).toEqual("PIX");
    })

    it('given payment is MONEY, then return Dinheiro', () => {
        expect(pipe.transform("MONEY")).toEqual("Dinheiro");
    })

    it('given payment is any other, then return any other', () => {
        expect(pipe.transform("ANY_OTHER")).toEqual("ANY_OTHER");
    })

})