import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseStockOptionComponent } from './purchase-stock-option.component';

@NgModule({
  declarations: [
    PurchaseStockOptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [PurchaseStockOptionComponent]
})
export class PurchaseStockOptionModule {}
