import { HasSizePipe } from './product-has-size.pipe';

describe('Has size pipe', () => {

    const pipe = new HasSizePipe();

    it('given product, when stock doesnt have size, then return false', () => {
        expect(pipe.transform({stock: [{}]} as any)).toBeFalsy();
    });

    it('given product, when stock has size, then return true', () => {
        expect(pipe.transform({stock: [{size: 'M'}]} as any)).toBeTruthy();
    });

});
