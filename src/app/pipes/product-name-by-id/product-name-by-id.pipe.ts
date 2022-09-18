import { Pipe, PipeTransform } from '@angular/core'; 
import { PurchaseProduct } from 'src/app/model/purchase/purchase';

@Pipe({name: 'productNameById'})
export class ProductNameByIdPipe implements PipeTransform {

  transform(value: string, products: PurchaseProduct[]): string {
    const product = products?.find(p => p.id === value);
    return product?.name || value;
  }

}