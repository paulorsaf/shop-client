import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';

@Pipe({name: 'productTotalPrice'})
@Injectable()
export class ProductTotalPricePipe implements PipeTransform {
    transform(item: ShoppingCartProduct): number {
        const price = item.product.priceWithDiscount || item.product.price;
        return price * item.quantity;
    }
};
