import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/model/product/product';

@Pipe({name: 'productHasSize'})
@Injectable()
export class HasSizePipe implements PipeTransform {
    transform(product: Product): boolean {
        if (!product || !product.stockOptions) {
            return false;
        }
        return product.stockOptions.some(s => s.size);
    }
};
