import { NgModule } from '@angular/core';
import { ProductNameByIdPipe } from './product-name-by-id.pipe';

@NgModule({
    declarations: [
        ProductNameByIdPipe
    ],
    exports: [
        ProductNameByIdPipe
    ]
})
export class ProductNameByIdPipeModule {}
