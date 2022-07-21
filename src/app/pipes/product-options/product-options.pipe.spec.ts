import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { ProductOptionsPipe } from './product-options.pipe';

describe('Product options pipe', () => {

    const pipe = new ProductOptionsPipe();

    describe('given shopping cart product', () => {

        it('when no options, then return empty', () => {
            const shoppingCartProduct: ShoppingCartProduct = {stockOption: {}} as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual('');
        });

        it('when only option is color, then return color', () => {
            const shoppingCartProduct: ShoppingCartProduct = {stockOption: {color: 'Azul'}} as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual('(Azul)');
        });

        it('when only option is size, then return size', () => {
            const shoppingCartProduct: ShoppingCartProduct = {stockOption: {size: 'M'}} as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual('(M)');
        });

        it('when options are color and size, then return color and size size', () => {
            const shoppingCartProduct: ShoppingCartProduct = {stockOption: {color: 'Azul', size: 'M'}} as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual('(Azul/M)');
        });

    });

});
