import { NgModule } from '@angular/core';
import { PaymentTypePipe } from './payment-type.pipe';

@NgModule({
    declarations: [
        PaymentTypePipe
    ],
    exports: [
        PaymentTypePipe
    ]
})
export class PaymentTypePipeModule {}
