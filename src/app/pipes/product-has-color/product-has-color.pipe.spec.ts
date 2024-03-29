import { HasColorPipe } from './product-has-color.pipe';

describe('Has color pipe', () => {

    const pipe = new HasColorPipe();

    it('given product, when stock doesnt have color, then return false', () => {
        expect(pipe.transform({stock: [{}]} as any)).toBeFalsy();
    });

    it('given product, when stock has color, then return true', () => {
        expect(pipe.transform({stock: [{color: 'M'}]} as any)).toBeTruthy();
    });

});
