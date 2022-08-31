import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchasesPageRoutingModule } from './purchases-routing.module';
import { PurchasesPage } from './purchases.page';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';
import { RetryPaymentPage } from './retry-payment/retry-payment.page';
import { PaymentComponentModule } from 'src/app/components/payment/payment.module';
import { PurchaseCardComponent } from './purchase-card/purchase-card.component';
import { PurchaseStatusMessageModule } from 'src/app/components/purchase-status-message/purchase-status-message.module';
import { PurchaseStatusesModule } from 'src/app/components/purchase-statuses/purchase-statuses.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasesPageRoutingModule,
    PaymentTypePipeModule,
    PaymentComponentModule,
    PurchaseStatusMessageModule,
    PurchaseStatusesModule
  ],
  declarations: [
    RetryPaymentPage,
    PurchasesPage,
    PurchaseCardComponent
  ]
})
export class PurchasesPageModule {}
