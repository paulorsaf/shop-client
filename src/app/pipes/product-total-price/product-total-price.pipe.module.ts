import { NgModule } from '@angular/core';
import { ProductTotalPricePipe } from './product-total-price.pipe';

@NgModule({
    declarations: [
        ProductTotalPricePipe
    ],
    exports: [
        ProductTotalPricePipe
    ]
})
export class ProductTotalPricePipeModule {}
