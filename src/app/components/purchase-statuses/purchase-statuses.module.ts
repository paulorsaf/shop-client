import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseStatusesComponent } from './purchase-statuses.component';

@NgModule({
  declarations: [
    PurchaseStatusesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [PurchaseStatusesComponent]
})
export class PurchaseStatusesModule {}
