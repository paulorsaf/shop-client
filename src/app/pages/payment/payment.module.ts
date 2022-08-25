import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentPageRoutingModule } from './payment-routing.module';
import { PaymentPage } from './payment.page';
import { PaymentComponentModule } from 'src/app/components/payment/payment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentPageRoutingModule,
    PaymentComponentModule
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
