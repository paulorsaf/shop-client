import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/model/product/product';

@Pipe({name: 'productHasColor'})
@Injectable()
export class HasColorPipe implements PipeTransform {
    transform(product: Product): boolean {
        if (!product || !product.stockOptions) {
            return false;
        }
        return product.stockOptions.some(s => s.color);
    }
};
