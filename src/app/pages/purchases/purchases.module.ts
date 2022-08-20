import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchasesPageRoutingModule } from './purchases-routing.module';
import { PurchasesPage } from './purchases.page';
import { PaymentTypePipe } from 'src/app/pipes/payment-type/payment-type.pipe';
import { PaymentTypePipeModule } from 'src/app/pipes/payment-type/payment-type.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasesPageRoutingModule,
    PaymentTypePipeModule
  ],
  declarations: [PurchasesPage]
})
export class PurchasesPageModule {}
