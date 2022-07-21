import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';

@Pipe({name: 'productOptions'})
@Injectable()
export class ProductOptionsPipe implements PipeTransform {
    transform(item: ShoppingCartProduct): string {
        const options = [];
        if (item.stockOption.color) {
            options.push(item.stockOption.color);
        }
        if (item.stockOption.size) {
            options.push(item.stockOption.size);
        }
        return options.length ? `(${options.join('/')})` : '';
    }
};
