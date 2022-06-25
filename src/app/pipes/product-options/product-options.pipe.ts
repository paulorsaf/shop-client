import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';

@Pipe({name: 'productOptions'})
@Injectable()
export class ProductOptionsPipe implements PipeTransform {
    transform(item: ShoppingCartProduct): string {
        const options = [];
        if (item.color) {
            options.push(item.color);
        }
        if (item.size) {
            options.push(item.size);
        }
        return options.length ? `(${options.join('/')})` : '';
    }
};
