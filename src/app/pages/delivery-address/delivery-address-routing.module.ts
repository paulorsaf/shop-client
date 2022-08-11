import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryAddressPage } from './delivery-address.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryAddressPageRoutingModule {}
