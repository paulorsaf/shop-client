import { NgModule } from '@angular/core';
import { HasColorPipe } from './product-has-color.pipe';

@NgModule({
    declarations: [
        HasColorPipe
    ],
    exports: [
        HasColorPipe
    ]
})
export class HasColorPipeModule {}
