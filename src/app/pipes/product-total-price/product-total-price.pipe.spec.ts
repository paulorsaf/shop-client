import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { ProductTotalPricePipe } from './product-total-price.pipe';

describe('Product options pipe', () => {

    const pipe = new ProductTotalPricePipe();

    describe('given shopping cart product', () => {

        it('when no discount, then return full price', () => {
            const shoppingCartProduct: ShoppingCartProduct = {
                stockOption: {quantity: 2},
                product: {price: 10}
            } as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual(20);
        });

        it('when discount, then return price with discount', () => {
            const shoppingCartProduct: ShoppingCartProduct = {
                stockOption: {quantity: 2},
                product: {price: 10, priceWithDiscount: 5}
            } as any;
            expect(pipe.transform(shoppingCartProduct)).toEqual(10);
        });

    });

});
