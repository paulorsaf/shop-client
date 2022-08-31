import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseStatusMessageComponent } from './purchase-status-message.component';

@NgModule({
  declarations: [
    PurchaseStatusMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [PurchaseStatusMessageComponent]
})
export class PurchaseStatusMessageModule {}
