import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSuccessPageRoutingModule } from './order-success-routing.module';

import { OrderSuccessPage } from './order-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSuccessPageRoutingModule
  ],
  declarations: [OrderSuccessPage]
})
export class OrderSuccessPageModule {}
