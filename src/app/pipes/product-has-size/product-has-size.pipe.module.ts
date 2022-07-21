import { NgModule } from '@angular/core';
import { HasSizePipe } from './product-has-size.pipe';

@NgModule({
    declarations: [
        HasSizePipe
    ],
    exports: [
        HasSizePipe
    ]
})
export class HasSizePipeModule {}
