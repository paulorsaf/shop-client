import { NgModule } from '@angular/core';
import { ProductOptionsPipe } from './product-options.pipe';

@NgModule({
    declarations: [
        ProductOptionsPipe
    ],
    exports: [
        ProductOptionsPipe
    ]
})
export class ProductOptionsPipeModule {}
