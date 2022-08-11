import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeliveryAddressPageRoutingModule } from './delivery-address-routing.module';
import { DeliveryAddressPage } from './delivery-address.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DeliveryAddressPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [DeliveryAddressPage]
})
export class DeliveryAddressPageModule {}
